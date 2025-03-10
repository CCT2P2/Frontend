export async function signIn(prevState: string | undefined, formData: FormData) {
    const username = formData.get('username');
    const password = formData.get('password');

    try {
        // TODO
    } catch (error) {
        return {error: error};
    }
}