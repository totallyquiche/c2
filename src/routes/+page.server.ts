import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const capture = formData.get('capture');

        console.log(capture);
    }
} satisfies Actions;
