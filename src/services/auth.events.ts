type AuthEventListener = () => void;

class AuthEventEmitter {
    private static instance: AuthEventEmitter;
    private listeners: AuthEventListener[] = [];

    private constructor() {}

    public static getInstance(): AuthEventEmitter {
        if (!AuthEventEmitter.instance) {
            AuthEventEmitter.instance = new AuthEventEmitter();
        }
        return AuthEventEmitter.instance;
    }

    subscribe(listener: AuthEventListener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    emit() {
        this.listeners.forEach(listener => listener());
    }
}

export default AuthEventEmitter.getInstance();
