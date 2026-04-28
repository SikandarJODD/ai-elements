import { redirect } from "@sveltejs/kit";

export const load = () => {
	throw redirect(307, "/cookbook-playground/basic-setup");
};
