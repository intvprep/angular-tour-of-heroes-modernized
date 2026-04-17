/** Utility: returns a Promise that resolves after `ms` milliseconds — like Thread.sleep() in Java */
export async function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
