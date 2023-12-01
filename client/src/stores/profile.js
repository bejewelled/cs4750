import { writable } from "svelte/store";

export const profile = writable({
    uid: 0,
    username: "",
    email: ""
});
