import { crossfade } from 'svelte/transition';
import { cubicOut } from 'svelte/easing';

// crossfade
export const [send, receive] = crossfade({
	duration: 400,
	easing: cubicOut
});
