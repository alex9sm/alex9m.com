<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';
  import ZoomImage from '$lib/components/ZoomImage.svelte';
  import Icon from '$lib/components/Icon.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { SITE_URL } from '$lib/seo';

  let visible = false;
  onMount(() => { visible = true; });

  const REPO = 'https://github.com/alex9sm/stats-server';

  const sources = [
    { path: '/proc/stat', desc: 'CPU usage, diffed against the previous tick for utilization' },
    { path: '/proc/meminfo', desc: 'Total, free, and available memory plus swaps' },
    { path: '/proc/loadavg', desc: 'One-minute load average and running / total process counts' },
    { path: '/proc/net/dev', desc: 'RX and TX bytes, packets, and drops' },
    { path: '/proc/diskstats', desc: 'Sectors read and written and time spent in I/O' },
    { path: '/proc/uptime', desc: 'Time since boot' },
    { path: 'statvfs()', desc: 'Storage capacity and inodes' },
  ];
</script>

<!-- The dashboard screenshot is a better social card here than the site default. -->
<Seo type="article" image="{SITE_URL}/stats-server/1.jpg" imageWidth={1519} imageHeight={838} />

{#if visible}
  <article class="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24" transition:fade={{ duration: 500 }}>

    <a href="/#projects" class="inline-flex items-center gap-2 text-sm text-zinc-600 hover:text-zinc-900 transition-colors mb-12">
      <Icon name="arrow-left" size={14} />
      Back to projects
    </a>

    <header class="mb-14">
      <p class="eyebrow mb-4">August/2026</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-900">
        Stats Server
      </h1>
      <div class="flex flex-wrap gap-2 mt-6">
        {#each ['C++', 'Linux', 'HTTP', 'Grafana', 'Proxmox'] as tag}
          <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-black/[0.03] border border-black/10 text-zinc-600">{tag}</span>
        {/each}
      </div>

      <a
        href={REPO}
        target="_blank"
        rel="noreferrer"
        class="glass glass-hover group inline-flex items-center gap-2.5 mt-8 rounded-xl px-4 py-2.5 text-sm text-zinc-700 hover:text-zinc-900"
      >
        <Icon name="github" size={16} />
        <span>View on GitHub</span>
        <span class="text-zinc-400 group-hover:text-accent-soft transition-colors">
          <Icon name="external-link" size={12} />
        </span>
      </a>
    </header>

    <div class="space-y-14 text-[1.05rem] leading-relaxed text-zinc-700">

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overview</h2>
        <p>
          Stats server is a monitoring service for Proxmox VE nodes. For now it reads 24 metrics
          from the kernel every five seconds and keeps thirty days of history in memory. 
          Serves over HTTP as json that Grafana can display.
        </p>
      </section>

      <!-- Screenshot -->
      <section>
        <ZoomImage
          src="/stats-server/1.jpg"
          alt="Grafana dashboard rendering CPU, memory, load, network, storage, and inode metrics served by stats-server"
          class="glass rounded-xl w-full object-cover"
        />
        <p class="text-sm text-zinc-500 mt-3">
          A Grafana dashboard reading from <code class="font-mono text-[0.85em]">/query_range</code>
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Why I Built It</h2>
        <p>
          I wanted insights into my homelab nodes without installing all the usual monitoring
          services. I also didn't want a huge database taking up storage space, and mostly, I wanted a small 
          project where I could get more familiar with C++, data types, and concurrency. This would have 
          been a one shot project with a coding agent, but I decided to write everything by hand over a week. Why? 
          because its fun.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Where do the Numbers Come From</h2>
        <p class="mb-6">
          Every metric is read from the kernel files besides statvfs. Scrapers keep a file
          descriptor and reads back to the start on each tick with pread. They also copy all data to a shared buffer which 
          is freed after each scrape. I did this to have zero allocations and no I/O overhead for every read.
          Counters that increase like network bytes, disk sectors are diffed
          against the previous sample and divided by the time to give the rates.
        </p>
        <ul class="space-y-3">
          {#each sources as source}
            <li class="flex items-start gap-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent-muted/70 shrink-0"></span>
              <span>
                <code class="font-mono text-[0.9em] text-zinc-900">{source.path}</code>
                <span class="text-zinc-600"> &mdash; {source.desc}</span>
              </span>
            </li>
          {/each}
        </ul>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Storage</h2>
        <p>
          Each tick structs are flattened into an array of floats and pushed into
          a ring buffer of 518,400 slots. This ring buffer stores 30 days of history in about 48MB. 
          The collector acts as a middle man, reading and writing from the http server and the buffer using a mutex 
          to ensure there aren't race conditions.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">The API</h2>
        <p class="mb-6">
          The HTTP layer is a very simple cpp-httplib server with nlohmann json for
          serialization which means theres no need for a package manager. The server thread reads requests 
          at port 8080.
        </p>
        <ul class="space-y-3">
          <li class="flex items-start gap-3">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent-muted/70 shrink-0"></span>
            <span>
              <code class="font-mono text-[0.9em] text-zinc-900">GET /health</code>
              <span class="text-zinc-600"> - health check</span>
            </span>
          </li>
          <li class="flex items-start gap-3">
            <span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent-muted/70 shrink-0"></span>
            <span>
              <code class="font-mono text-[0.9em] text-zinc-900">GET /query_range?from=&amp;to=&amp;step=</code>
              <span class="text-zinc-600"> window of history. from start ms to end ms and downsampled to the step</span>
            </span>
          </li>
        </ul>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">What's Next</h2>
        <p>
          Goal for now is to just add more metrics, probably temperature readings which will be difficult since 
          the sources will differ based on hardware. Also on my list is per LXC and VM metrics but I will have to 
          look into what that entails.
        </p>
      </section>

    </div>
  </article>
{/if}
