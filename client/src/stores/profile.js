import { writable } from "svelte/store";

export const profile = writable({
    isLoggedIn: false,
    user_id: -1,
    username: "",
    email: ""
});
