<template>
  <div>
    <Navbar />

    <section class="relative w-full py-20 sm:py-28 overflow-hidden">
      <!-- Enhanced background with animated gradients -->

      <div
        aria-hidden="true"
        class="absolute inset-0 -z-10"
      >
        <div class="absolute inset-0 dark:bg-gradient-to-tl dark:from-pink-700/50 dark:via-purple-700/50 dark:to-blue-800/50 bg-gradient-to-tl  from-pink-200 via-purple-200 to-blue-300"></div>
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-purple-300/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-300/20 dark:bg-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div class="container mx-auto px-4 max-w-7xl">
        <!-- Enhanced page header -->
        <div class="text-center max-w-4xl mx-auto mb-16">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-100/80 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-sm font-medium mb-6 backdrop-blur-sm">
            <Icon name="lucide:sparkles" size="16" />
            AI-Powered Image Analysis
          </div>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
            <span class="bg-gradient-to-l from-violet-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              How Captura AI
            </span>
            <br />
            <span class="text-gray-900 dark:text-white">Works</span>
          </h1>
          <p class="mt-6 text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
            From upload to AI description in seconds. Discover the magical journey your image takes.
          </p>
        </div>

        <!-- Enhanced flow diagram -->
        <div class="mt-20">
          <!-- Desktop/tablet: horizontal flow with animations -->
          <div class="hidden lg:block">
            <div class="relative">
              <!-- Connection lines -->
              <div class="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 dark:from-violet-600 dark:via-purple-600 dark:to-pink-600 -translate-y-0.5"></div>

              <div class="relative flex items-stretch justify-between gap-8">
                <!-- Step 1 -->
                <div class="group flex-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                  <div class="relative h-full rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-violet-500/25 transition-all duration-500 hover:-translate-y-2">
                    <div class="flex flex-col items-center text-center h-full">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="lucide:upload" size="32" class="text-white" />
                      </div>
                      <div class="w-8 h-8 rounded-full bg-violet-500 text-white font-bold flex items-center justify-center text-sm mb-6">1</div>
                      <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-3">Upload & Configure</h3>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        Choose your preferred <span class="font-semibold text-violet-600 dark:text-violet-400">writing style</span>
                        and <span class="font-semibold text-violet-600 dark:text-violet-400">language</span>, then upload your image.
                      </p>
                      <div class=" px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs mt-auto">
                        100% client-side
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 2 -->
                <div class="group flex-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                  <div class="relative h-full rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:-translate-y-2">
                    <div class="flex flex-col items-center text-center h-full">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="lucide:server" size="32" class="text-white" />
                      </div>
                      <div class="w-8 h-8 rounded-full bg-blue-500 text-white font-bold flex items-center justify-center text-sm mb-6">2</div>
                      <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-3">Secure Transfer</h3>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        Your browser sends a secure <code class="px-2 py-1 rounded bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs">POST</code>
                        to our API with your image and preferences.
                      </p>
                      <div class=" px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs mt-auto">
                        Rate limiting included
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 3 -->
                <div class="group flex-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                  <div class="relative h-full rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-emerald-500/25 transition-all duration-500 hover:-translate-y-2">
                    <div class="flex flex-col items-center text-center h-full">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="lucide:cloud-upload" size="32" class="text-white" />
                      </div>
                      <div class="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-sm mb-6">3</div>
                      <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-3">Cloud Processing</h3>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        ImageKit provides temporary, secure storage for your image so our AI can access it.
                      </p>
                      <div class="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs mt-auto">
                        Auto-cleanup
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 4 -->
                <div class="group flex-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-pink-600 to-rose-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                  <div class="relative h-full rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-pink-500/25 transition-all duration-500 hover:-translate-y-2">
                    <div class="flex flex-col items-center text-center h-full">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="lucide:brain-circuit" size="32" class="text-white" />
                      </div>
                      <div class="w-8 h-8 rounded-full bg-pink-500 text-white font-bold flex items-center justify-center text-sm mb-6">4</div>
                      <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-3">AI Magic</h3>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        OpenAI’s advanced AI analyzes your image and creates a precise, creative description.
                      </p>
                      <div class="px-3 py-1 rounded-full bg-pink-100 dark:bg-pink-900/30 text-pink-700 dark:text-pink-300 text-xs mt-auto">
                         Image generation
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Step 5 -->
                <div class="group flex-1 relative">
                  <div class="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-xl"></div>
                  <div class="relative h-full rounded-3xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-8 shadow-2xl hover:shadow-indigo-500/25 transition-all duration-500 hover:-translate-y-2">
                    <div class="flex flex-col items-center text-center h-full">
                      <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon name="lucide:sparkles" size="32" class="text-white" />
                      </div>
                      <div class="w-8 h-8 rounded-full bg-indigo-500 text-white font-bold flex items-center justify-center text-sm mb-6">5</div>
                      <h3 class="font-bold text-xl text-gray-900 dark:text-white mb-3">Done!</h3>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        You’ll quickly receive your AI description and image. Everything gets cleaned up after.
                      </p>
                      <div class="mt-auto px-3 py-1 block rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs">
                        Privacy guaranteed
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Mobile/tablet: enhanced vertical flow -->
          <div class="lg:hidden space-y-6">
            <div v-for="(card, idx) in mobileCards" :key="idx" class="relative">
              <div class="group">
                <div class="absolute inset-0 bg-gradient-to-r from-[#e74ab7] via-[#7c4ce5]/10 to-[#1262fc] rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300 blur-xl"></div>
                <div class="relative rounded-2xl border border-white/30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-6 shadow-xl">
                  <div class="flex items-start gap-4">
                    <div :class="['w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0', card.bg]">
                      <Icon :name="card.icon" size="24" class="text-white" />
                    </div>
                    <div class="flex-1">
                      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ card.title }}</h3>
                      <p class="text-gray-600 dark:text-gray-300">{{ card.text }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="idx < mobileCards.length - 1" class="flex justify-center mt-4">
                <div class="w-0.5 h-8 bg-gradient-to-b from-violet-300 to-pink-300 dark:from-violet-600 dark:to-pink-600"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced technical timeline -->
        <div class="mt-24">
          <div class="text-center mb-12">
            <h2 class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent mb-4">
              Technical Details
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              For the curious minds, here’s what happens behind the scenes.
            </p>
          </div>

          <div class="max-w-4xl mx-auto">
            <div class="relative">
              <!-- Timeline line -->
              <div class="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-violet-300 via-purple-300 to-pink-300 dark:from-violet-600 dark:via-purple-600 dark:to-pink-600"></div>

              <div class="space-y-8">
                <div v-for="(item, idx) in enhancedTimelineItems" :key="idx" class="relative flex items-start gap-6">
                  <div class="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-700 via-purple-700 to-blue-800 flex items-center justify-center shadow-lg flex-shrink-0 relative z-10">
                    <Icon :name="item.icon" size="24" class="text-white" />
                  </div>
                  <div class="flex-1 pb-8">
                    <div class="rounded-xl border border-white/20 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl p-6 shadow-xl">
                      <h3 class="font-bold text-lg text-gray-900 dark:text-white mb-2">{{ item.title }}</h3>
                      <p class="text-gray-600 dark:text-gray-300">{{ item.description }}</p>
                      <div v-if="item.tech" class="mt-3 flex flex-wrap gap-2">
                        <span v-for="tech in item.tech" :key="tech" class="px-2 py-1 rounded-md bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-medium">
                          {{ tech }}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Call to action -->
        <div class="mt-20 text-center">
          <div class="relative inline-block">
            <div class="absolute inset-0 bg-gradient-to-r from-violet-600 to-pink-600 rounded-2xl blur-xl opacity-30"></div>
            <div class="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/20 shadow-2xl">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Ready to try it yourself?
              </h3>
              <p class="text-gray-600 dark:text-gray-300 mb-6">
                Upload your first image and experience the power of AI‑driven descriptions.
              </p>
              <NuxtLink to="/" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Icon name="lucide:arrow-right" size="20" />
                Go to the app
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Footer />
</div>
</template>

<script setup lang="ts">


const mobileCards = [
  {
    icon: 'lucide:upload',
    title: '1) Upload & Configure',
    text: 'Choose your style and language, then upload your image for analysis.',
    bg: 'bg-gradient-to-br from-violet-500 to-purple-600'
  },
  {
    icon: 'lucide:server',
    title: '2) Secure Transfer',
    text: 'Your browser sends a secure request to our API with your image and preferences.',
    bg: 'bg-gradient-to-br from-blue-500 to-cyan-600'
  },
  {
    icon: 'lucide:cloud-upload',
    title: '3) Cloud Processing',
    text: 'ImageKit provides temporary, secure storage so the AI can access your image.',
    bg: 'bg-gradient-to-br from-emerald-500 to-teal-600'
  },
  {
    icon: 'lucide:brain-circuit',
    title: '4) AI Magic',
    text: 'OpenAI analyzes your image and creates an accurate, creative description.',
    bg: 'bg-gradient-to-br from-pink-500 to-rose-600'
  },
  {
    icon: 'lucide:sparkles',
    title: '5) Done!',
    text: 'You instantly get results — everything is cleaned up.',
    bg: 'bg-gradient-to-br from-indigo-500 to-purple-600'
  },
]

const enhancedTimelineItems = [
  {
    title: 'Client to Server',
    description: 'A secure POST request to the api-handler with your image, selected style, and language preferences.',
    icon: 'lucide:send',
    tech: ['multipart/form-data', 'HTTPS', 'CORS']
  },
  {
    title: 'Rate Limiting & Validation',
    description: 'Upstash Redis enforces fair usage with IP-based limits and validates file types.',
    icon: 'lucide:shield-check',
    tech: ['Redis', 'Rate limiting', 'File validation']
  },
  {
    title: 'ImageKit Cloud Upload',
    description: 'Temporary, secure upload to ImageKit to obtain an accessible URL for the AI.',
    icon: 'lucide:cloud-upload',
    tech: ['ImageKit API', 'Temporary storage', 'CDN']
  },
  {
    title: 'OpenAI Description',
    description: 'Advanced vision AI generates an accurate, creative description based on your selected style.',
    icon: 'lucide:brain-circuit',
    tech: ['GPT-4 Vision', 'Custom prompts', 'Multi-language']
  },
  {
    title: 'AI Image',
    description: 'If enabled, DALL-E generates a new image based on the AI description.',
    icon: 'lucide:image-plus',
    tech: ['DALL-E 3', 'Budget tracking', 'Quality optimization']
  },
  {
    title: 'Cleanup & Result',
    description: 'ImageKit files are removed and you receive a JSON response with your results.',
    icon: 'lucide:check-circle',
    tech: ['Auto cleanup', 'JSON API', 'Privacy first']
  }
]



</script>
