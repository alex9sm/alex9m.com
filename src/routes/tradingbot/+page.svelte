<script>
  import { fade } from 'svelte/transition';
  import { onMount } from 'svelte';

  let visible = false;
  onMount(() => { visible = true; });

  const technologies = [
    'Python for program logic',
    'Discord API for displaying data',
    'Brokerage APIs for automation',
    'Natural language processing with the OpenAI API',
  ];

  const reading = [
    {
      title: 'What is Reverse Split Arbitrage? RSA Strategy Explained',
      source: 'TradeLabs',
      desc: 'A practical breakdown of the strategy mechanics and how it gets automated.',
      href: 'https://tradelabs.org/blog/posts/rsa-signals-automated-trading/',
    },
    {
      title: 'Reverse Stock Splits and Fractional Share Management',
      source: 'SIFMA — White Paper',
      desc: 'Industry framework on fractional share round-ups and the market-integrity concerns RSA raises.',
      href: 'https://www.sifma.org/research/white-papers/reverse-stock-splits-and-fractional-share-management-a-framework-for-market-integrity',
    },
  ];
</script>

{#if visible}
  <article class="max-w-3xl mx-auto px-5 md:px-8 py-16 md:py-24" transition:fade={{ duration: 500 }}>

    <a href="/" class="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-100 transition-colors mb-12">
      <i class="fa-solid fa-arrow-left text-xs"></i>
      Back to home
    </a>

    <header class="mb-14">
      <p class="eyebrow mb-4">Writeup &mdash; Automation</p>
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight text-zinc-100">
        Arbitrage Trading Bot
      </h1>
      <div class="flex flex-wrap gap-2 mt-6">
        {#each ['Python', 'OpenAI', 'Discord API', 'Brokerage APIs', 'Web scraping'] as tag}
          <span class="font-mono text-[0.65rem] px-2 py-1 rounded-md bg-white/[0.03] border border-white/10 text-zinc-400">{tag}</span>
        {/each}
      </div>
    </header>

    <div class="space-y-14 text-[1.05rem] leading-relaxed text-zinc-300">

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Overview</h2>
        <p>
          This project implements web scraping and NLP to process SEC filings and exploit
          RSA (Reverse Split Arbitrage) opportunities.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">Technologies Used</h2>
        <ul class="space-y-3">
          {#each technologies as tech}
            <li class="flex items-start gap-3">
              <span class="mt-2 h-1.5 w-1.5 rounded-full bg-accent-muted/70 shrink-0"></span>
              <span>{tech}</span>
            </li>
          {/each}
        </ul>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">The Opportunity</h2>
        <p>
          When a penny stock price falls below the minimum threshold to remain listed on the exchange, the company board can elect to undergo a reverse split,
          where multiple shares are consolidated into one. The ratio is determined by the company's board. However,
          since most of these penny stock companies do not meet the requirements to be managed by brokerage firms, they
          cannot issue fractional shares. If the amount of shares owned by a trader before the split is less than the amount needed to consolidate
          into one full share after the split, the company will be forced to either pay out the amount owed to the trader in cash, or round up the
          trader's shares to one full share. If the latter occurs, the trader will make the difference between the now fractional share
          they paid for, and the full share.
        </p>
      </section>

      <section>
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-4">The Project</h2>
        <p>
          Now that we have an edge we can implement an automation. By scraping all new reverse split filings publicly posted by the SEC
          and using AI to parse the information, we can binarize the event into a profitable or not-profitable opportunity. Remember,
          we only want to buy if the company will round up our fractional share after the split. Next, we integrate the result into a
          Discord webhook to give us an easy-to-use UI to place our trades. Finally, we access the public APIs of multiple brokerages
          to maximize the amount of trades we can place by using multiple accounts. What we are left with is a largely automated process
          where the user only has to make a buy or pass decision on each given opportunity, effectively giving us a passive income stream
          scalable to however many brokerage accounts we can have open at once.
        </p>
      </section>

      <!-- Further Reading -->
      <section>
        <hr class="hairline mb-10" />
        <h2 class="text-sm font-mono uppercase tracking-widest text-zinc-500 mb-2">Further Reading</h2>
        <p class="text-sm text-zinc-500 mb-6">External articles on reverse split arbitrage, its mechanics, and the regulatory landscape.</p>
        <div class="grid gap-3">
          {#each reading as item}
            <a
              href={item.href}
              target="_blank"
              rel="noreferrer"
              class="glass glass-hover group rounded-xl p-4 flex items-start gap-4"
            >
              <span class="mt-0.5 text-zinc-500 group-hover:text-accent-soft transition-colors">
                <i class="fa-solid fa-arrow-up-right-from-square text-xs"></i>
              </span>
              <span class="flex-1">
                <span class="block text-base text-zinc-100 group-hover:text-white transition-colors">{item.title}</span>
                <span class="block font-mono text-[0.65rem] uppercase tracking-wider text-zinc-500 mt-1">{item.source}</span>
                <span class="block text-sm text-zinc-400 mt-2 leading-relaxed">{item.desc}</span>
              </span>
            </a>
          {/each}
        </div>
      </section>

    </div>
  </article>
{/if}
