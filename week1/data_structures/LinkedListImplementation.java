package data_structures;

/**
 * Linked List Implementation
 * Exercise: Implement a singly linked list with basic operations
 */

class Node {
    int data;
    Node next;
    
    public Node(int data) {
        this.data = data;
        this.next = null;
    }
}

class LinkedList {
    private Node head;
    
    public LinkedList() {
        this.head = null;
    }
    
    // Insert at the beginning
    public void insertAtBeginning(int data) {
        Node newNode = new Node(data);
        newNode.next = head;
        head = newNode;
        System.out.println("Inserted " + data + " at beginning");
    }
    
    // Insert at the end
    public void insertAtEnd(int data) {
        Node newNode = new Node(data);
        if (head == null) {
            head = newNode;
            System.out.println("Inserted " + data + " at end");
            return;
        }
        Node current = head;
        while (current.next != null) {
            current = current.next;
        }
        current.next = newNode;
        System.out.println("Inserted " + data + " at end");
    }
    
    // Delete a node
    public void delete(int data) {
        if (head == null) {
            System.out.println("List is empty");
            return;
        }
        if (head.data == data) {
            head = head.next;
            System.out.println("Deleted " + data);
            return;
        }
        Node current = head;
        Node prev = null;
        while (current != null && current.data != data) {
            prev = current;
            current = current.next;
        }
        if (current == null) {
            System.out.println("Element " + data + " not found");
            return;
        }
        prev.next = current.next;
        System.out.println("Deleted " + data);
    }
    
    // Search for an element
    public boolean search(int data) {
        Node current = head;
        while (current != null) {
            if (current.data == data) {
                return true;
            }
            current = current.next;
        }
        return false;
    }
    
    // Display the list
    public void display() {
        Node current = head;
        System.out.print("List: ");
        while (current != null) {
            System.out.print(current.data + " -> ");
            current = current.next;
        }
        System.out.println("null");
    }
    
    // Get size
    public int size() {
        int count = 0;
        Node current = head;
        while (current != null) {
            count++;
            current = current.next;
        }
        return count;
    }
}

public class LinkedListImplementation {
    public static void main(String[] args) {
        System.out.println("=== Linked List Implementation ===\n");
        
        LinkedList list = new LinkedList();
        
        list.insertAtEnd(10);
        list.insertAtEnd(20);
        list.insertAtBeginning(5);
        list.insertAtEnd(30);
        
        list.display();
        System.out.println("Size: " + list.size());
        
        System.out.println("\nSearch 20: " + list.search(20));
        System.out.println("Search 100: " + list.search(100));
        
        list.delete(20);
        list.display();
        System.out.println("Size: " + list.size());
        
        list.delete(5);
        list.display();
    }
}
