package design_patterns;

/**
 * Singleton Pattern - Creational Pattern
 * Ensures a class has only one instance and provides a global point of access to it.
 * 
 * Exercise: Implement Singleton pattern with thread-safe initialization
 */

// Eager Initialization
class EagerSingleton {
    private static final EagerSingleton instance = new EagerSingleton();
    
    private EagerSingleton() {
        System.out.println("Eager Singleton initialized");
    }
    
    public static EagerSingleton getInstance() {
        return instance;
    }
    
    public void doSomething() {
        System.out.println("Eager Singleton doing something");
    }
}

// Lazy Initialization
class LazySingleton {
    private static LazySingleton instance;
    
    private LazySingleton() {
        System.out.println("Lazy Singleton initialized");
    }
    
    public static LazySingleton getInstance() {
        if (instance == null) {
            instance = new LazySingleton();
        }
        return instance;
    }
    
    public void doSomething() {
        System.out.println("Lazy Singleton doing something");
    }
}

// Thread-Safe Lazy Initialization
class ThreadSafeSingleton {
    private static ThreadSafeSingleton instance;
    
    private ThreadSafeSingleton() {
        System.out.println("Thread-Safe Singleton initialized");
    }
    
    public static synchronized ThreadSafeSingleton getInstance() {
        if (instance == null) {
            instance = new ThreadSafeSingleton();
        }
        return instance;
    }
    
    public void doSomething() {
        System.out.println("Thread-Safe Singleton doing something");
    }
}

// Double-Checked Locking
class DoubleCheckedLockingSingleton {
    private static volatile DoubleCheckedLockingSingleton instance;
    
    private DoubleCheckedLockingSingleton() {
        System.out.println("Double-Checked Locking Singleton initialized");
    }
    
    public static DoubleCheckedLockingSingleton getInstance() {
        if (instance == null) {
            synchronized (DoubleCheckedLockingSingleton.class) {
                if (instance == null) {
                    instance = new DoubleCheckedLockingSingleton();
                }
            }
        }
        return instance;
    }
    
    public void doSomething() {
        System.out.println("Double-Checked Locking Singleton doing something");
    }
}

public class SingletonPattern {
    public static void main(String[] args) {
        System.out.println("=== Singleton Pattern Demo ===\n");
        
        // Eager Singleton
        System.out.println("Eager Singleton:");
        EagerSingleton eager1 = EagerSingleton.getInstance();
        EagerSingleton eager2 = EagerSingleton.getInstance();
        System.out.println("Same instance: " + (eager1 == eager2));
        eager1.doSomething();
        
        // Lazy Singleton
        System.out.println("\nLazy Singleton:");
        LazySingleton lazy1 = LazySingleton.getInstance();
        LazySingleton lazy2 = LazySingleton.getInstance();
        System.out.println("Same instance: " + (lazy1 == lazy2));
        lazy1.doSomething();
        
        // Thread-Safe Singleton
        System.out.println("\nThread-Safe Singleton:");
        ThreadSafeSingleton ts1 = ThreadSafeSingleton.getInstance();
        ThreadSafeSingleton ts2 = ThreadSafeSingleton.getInstance();
        System.out.println("Same instance: " + (ts1 == ts2));
        ts1.doSomething();
        
        // Double-Checked Locking Singleton
        System.out.println("\nDouble-Checked Locking Singleton:");
        DoubleCheckedLockingSingleton dcl1 = DoubleCheckedLockingSingleton.getInstance();
        DoubleCheckedLockingSingleton dcl2 = DoubleCheckedLockingSingleton.getInstance();
        System.out.println("Same instance: " + (dcl1 == dcl2));
        dcl1.doSomething();
    }
}
