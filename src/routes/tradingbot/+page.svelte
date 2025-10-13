<script>
    import { fade } from 'svelte/transition';
    import { onMount } from 'svelte';

    let visible = false;

    onMount(() => {
        visible = true;
    });
</script>

{#if visible}
    <div class="px-10 py-20" transition:fade={{ duration: 500 }}>
        <div class="max-w-4xl mx-auto">
            <!-- Back button -->
            <a href="/" class="text-sky-200 hover:text-sky-400 transition-colors duration-200 mb-8 inline-block">
                ← Back to Home
            </a>

            <!-- Title -->
            <h1 class="text-4xl md:text-5xl font-bold text-sky-200 [text-shadow:_0_0px_15px_rgb(99_102_241_/_0.5)] mb-8">
                Arbitrage Trading Bot Project
            </h1>

            <!-- Content -->
            <div class="space-y-6 text-lg leading-relaxed items-center">
                <section>
                    <h2 class="text-2xl font-bold text-sky-200 mb-4">Overview</h2>
                    <p class="mb-12">
                        This project implements webscraping and NLP to process SEC filings to exploit RSA(Reverse Split Arbitrage) Opportunities.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-sky-200 mb-4">Technologies Used</h2>
                    <ul class="list-disc list-inside space-y-2 mb-12">
                        <li>Python for program logic</li>
                        <li>Discord API for displaying data</li>
                        <li>Brokerage API for automation</li>
                        <li>Natural language processing with Openai API</li>
            
                    </ul>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-sky-200 mb-4">The Opportunity</h2>
                    <p class="mb-12">
                        When a penny stock price falls below the minimun threshold to remain listed on the exchange, the company board can elect to undergo a reverse split, 
                        where multiple shares are consolidated into one. The ratio is determined by the company's board. However,
                        since most of these penny stock companies do not meet the requirements to be managed by brokerage firms, they 
                        cannot issue fractional shares. If the amount of shares owned by a trader before the split is less than the amount needed to consolidate 
                        into one full share after the split, the company will be forced to either pay out the amount owed to the trader in cash, or round up the 
                        trader's shares to one full share. If the latter occurs, the trader will make the difference between the now fractional share 
                        he paid for, and the full share.
                    </p>
                </section>

                <section>
                    <h2 class="text-2xl font-bold text-sky-200 mb-4">The Project</h2>
                    <p class="mb-12">
                        Now that we have an edge we can implement an automation. By scraping all new reverse split filings publicly posted by the SEC 
                        and using AI to parse the information, we can binarize the event into a profitable or not-profitable opportunity. Remember, 
                        we only want to buy if the company will round up our fractional share after the split. Next, we integrate the result into a 
                        Discord webhook to give us a easy to use UI to place our trades. Finally, we access the public API's of multiple brokerage's 
                        to maximize the amount of trades we can place by using multiple accounts. What we are left with is a largely automated process 
                        where the user only has to make a buy or pass decision on each given opportunity, effectively giving us a passive income stream 
                        scalable to however many brokerage accounts we can have open at once.
                    </p>
                </section>
            </div>
        </div>
    </div>
{/if}

<style>
    /* Add any custom styles here if needed */
</style>
