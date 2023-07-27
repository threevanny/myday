export function generateId(length = 6){
    const CHARS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from({length}, ()=> CHARS[Math.floor(Math.random() * CHARS.length)]).join('');
}