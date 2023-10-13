<script setup lang="ts"></script>

<template>
    <div class="max-w-[620px] w-full m-auto px-3 py-0 mt-[30px] lt-sm:mt-[10px]">
        <h1 class="text-[34px] font-extrabold text-[#541c1f] mb-[20px] lt-sm:text-[24px] lt-sm:mb-[10px]">
            An online Pomodoro Timer to boost your productivity
        </h1>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                What is Pomofocus?
                <br><div class="block w-[24px] pt-[8px] border-b-[4px] border-[#f05b56] opacity-60" />
            </h2>
            <p class="text-[18px] text-[#541c1f] mt-[18px] lt-sm:text-[14px] lt-sm:mt-[10px]">
                Pomofocus is a customizable pomodoro timer that works on desktop & mobile browser. The aim of this app is to help you focus on any task you are working on, such as study, writing, or coding. This app is inspired by <a href="https://francescocirillo.com/pages/pomodoro-technique" class="font-bold text-[#db524d]">Pomodoro Technique</a> which is a time management method developed by Francesco Cirillo.
            </p>
        </div>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                What is Pomodoro Technique?
                <br><div class="block w-[24px] pt-[8px] border-b-4px border-[#f05b56] opacity-60" />
            </h2>
            <p class="text-[18px] text-[#541c1f] mt-[18px] lt-sm:text-[14px] lt-sm:mt-[10px]">
                The Pomodoro Technique is created by Francesco Cirillo for a more productive way to work and study. The technique uses a timer to break down work into intervals, traditionally 25 minutes in length, separated by short breaks. Each interval is known as a pomodoro, from the Italian word for 'tomato', after the tomato-shaped kitchen timer that Cirillo used as a university student. - <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" class="font-bold text-[#db524d]">Wikipedia</a>
            </p>
        </div>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                How to use the Pomodoro Timer?
                <br><div class="block w-[24px] pt-[8px] border-b-4px border-[#f05b56] opacity-60" />
            </h2>
            <ol class="list-decimal pl-6 mt-4 flex flex-col gap-3 text-[16px] text-[#541c1f]  lt-sm:text-[12px]">
                <li><strong>Add tasks to</strong> work on today</li>
                <li><strong>Set estimate pomodoros</strong> (1 = 25min of work) for each tasks</li>
                <li><strong>Select a task</strong> to work on</li>
                <li><strong>Start timer</strong> and focus on the task for 25 minutes</li>
                <li><strong>Take a break</strong> for 5 minutes when the alarm ring</li>
                <li><strong>Iterate</strong> 3-5 until you finish the tasks</li>
            </ol>
        </div>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                Basic Features
                <br><div class="block w-[24px] pt-[8px] border-b-[4px] border-[#f05b56] opacity-60" />
            </h2>
            <ol class="list-disc pl-6 mt-4 flex flex-col gap-3 text-[18px] text-[#541c1f] lt-sm:text-[14px]">
                <li><strong>Estimate Finish Time:</strong> Get an estimate of the time required to complete your daily tasks.</li>
                <li><strong>Add Templates:</strong> Save your repetitive tasks as templates and add them with just one click.</li>
                <li><strong>Visual Reports:</strong> See how much time you've focused each day, week, and month.</li>
                <li><strong>Custom Settings:</strong> Personalize your focus/break time, alarm sounds, background sounds, and more.</li>
            </ol>
        </div>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                Premium Features
                <br><div class="block w-[24px] pt-[8px] border-b-4px border-[#f05b56] opacity-60" />
            </h2>
            <ol class="list-disc pl-6 mt-4 flex flex-col gap-3 text-[18px] text-[#541c1f]  lt-sm:text-[14px]">
                <li><strong>Add Projects:</strong>Track how much time you spend on each project.</li>
                <li><strong>Yearly Reports:</strong> View your focus hours for each year.</li>
                <li><strong> Download Reports:</strong> Download your focus history in CSV format.</li>
                <li><strong>No Template Limit:</strong> Save more than 3 templates.</li>
                <li><strong>Todoist Integration:</strong> Load tasks from your Todoist account.</li>
                <li><strong>Webhook Integration:</strong>Connect to other apps (Zapier, IFTTT, etc).</li>
                <li><strong>No Ads:</strong> Enjoy a clean and distraction-free app experience.</li>
            </ol>
        </div>
        <div>
            <h2 class="text-[#541c1f] text-[24px] font-extrabold mt-7 lt-sm:text-[18px] lt-sm:mt-4">
                Download App
                <br><div class="block w-[24px] pt-[8px] border-b-4px border-[#f05b56] opacity-60  lt-sm:text-[14px]" />
            </h2>
            <ol class="list-disc pl-6 mt-4 flex flex-col gap-3 text-[18px] text-[#541c1f]  lt-sm:text-[14px]">
                <li><strong><a href="/downloadable/pomofocus-darwin-x64-1.1.0.zip" class="text-[#db524d]" download>For macOS </a></strong>(zip file) *Right click the icon to open</li>
                <li><strong><a href="/downloadable/pomofocus-1.1.0-setup.zip" class="text-[#db524c]" download>For Windows</a></strong> (zip file)</li>
            </ol>
        </div>
    </div>
    <footer class="mt-[40px] border-[2px] border-[#efefef] text-center pt-30px text-[#785e60] pb-[20px]">
        <div class="w-full max-w-[620px] m-auto px-3 py-0 flex flex-col gap-4">
            <div class="flex items-center justify-center gap-3 flex-wrap">
                <router-link to="/" class="cursor-pointer text-[#785e60] uppercase font-bold">
                    Home
                </router-link>
                <router-link to="privacy" class="cursor-pointer text-[#785e60] uppercase font-bold">
                    Privacy
                </router-link>
                <router-link to="terms" class="cursor-pointer text-[#785e60] uppercase font-bold">
                    Terms
                </router-link>
                <router-link to="contact" class="cursor-pointer text-[#785e60] uppercase font-bold">
                    Contact
                </router-link>
                <router-link to="app" class="cursor-pointer text-[#785e60] uppercase font-bold">
                    Simple Page
                </router-link>
            </div>
            <div class="footer-icons flex justify-center gap-3">
                <a href="https://www.facebook.com/pomofocus" class="flex items-center justify-center font-bold bg-[#999] rounded-full h-[40px] w-[40px]">
                    <div i-carbon-logo-facebook class="text-[28px] text-[#fff]" />
                </a>
                <a href="https://twitter.com/pomofocus" class="flex items-center justify-center font-bold bg-[#999] rounded-full h-[40px] w-[40px]">
                    <div i-carbon-logo-twitter class="text-[28px] text-[#fff]" />
                </a>
                <a href="https://www.instagram.com/" class="flex items-center justify-center font-bold bg-[#999] rounded-full h-[40px] w-[40px]">
                    <div i-carbon-logo-instagram class="text-[28px] text-[#fff]" />
                </a>
            </div>
            <div>
                <p>Made with &lt;3  <a href="#" class="text-#db524d opacity-80 font-bold">Yuya Uzu</a> </p>
            </div>
            <div class="text-12px text-[#a19192]">
                &copy;Pomofocus 2023. All Rights Reserved.
            </div>
        </div>
    </footer>
</template>
