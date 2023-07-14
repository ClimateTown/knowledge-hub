<script lang="ts">
    import { createEventDispatcher, onMount } from "svelte";
    import { DEFAULT_DISPLAY_LIMIT, SCROLL_THRESHOLD } from "$lib/constants";
    import ButtonLinks from "$lib/components/ButtonLinks.svelte";

    const dispatch = createEventDispatcher<{
        updateLimit: { displayLimit: number };
    }>();
    let displayLimit = DEFAULT_DISPLAY_LIMIT;
    let scrollPosition = 0;
    let showButton: boolean = false;

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
        // return keyboard focus to top
        mainH1El?.setAttribute("tabIndex", "0");
        mainH1El?.focus();
    };

    // Event listener for scroll events and update limit
    const handleScroll = () => {
        scrollPosition = document.documentElement.scrollTop || 0;
        showButton = scrollPosition >= window.innerHeight * 2;
        if (scrollPosition >= SCROLL_THRESHOLD) updateDisplayLimit();
    };

    // Update the displayLimit based on the scroll position
    const updateDisplayLimit = () => {
        const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
        const currentPosition = scrollTop + clientHeight;

        if (currentPosition >= scrollHeight - SCROLL_THRESHOLD) {
            displayLimit += DEFAULT_DISPLAY_LIMIT;
        }
        dispatch("updateLimit", { displayLimit });
    };

    let mainH1El: HTMLHeadingElement | null;
    // Hook into component lifecycle events
    onMount(() => {
        mainH1El = document.querySelector("main > h1");
        window.addEventListener("scroll", handleScroll);
    });
</script>

<ButtonLinks
    type="button"
    version="filled"
    color="green"
    isCircle={true}
    on:click={scrollToTop}
    extraClasses="w-10 h-10 justify-center rounded-full fixed transition-opacity bottom-10 right-10 z-50 outline-offset-2 {showButton
        ? 'opacity-100'
        : 'opacity-0'}"
>
    <svg
        slot="icon"
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        viewBox="0 0 16 16"
        class="bi bi-chevron-up w-6 h-6 inline bg-center"
    >
        <path
            fill-rule="evenodd"
            d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"
        />
    </svg>
    <span slot="label" class="sr-only">Back to Top</span>
</ButtonLinks>
