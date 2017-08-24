export const api = {

    // Save counter state
    save: (counter: { value: number }): Promise<null> => {
        localStorage.setItem('__counterValue', counter.value.toString())
        return Promise.resolve(null)
    },

    // Load counter state
    load: (): Promise<{ value: number }> => {
        const value = parseInt(localStorage.getItem('__counterValue'), 10)
        return Promise.resolve({ value })
    },
}