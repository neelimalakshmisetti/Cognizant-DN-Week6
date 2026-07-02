package solid_principles;

/**
 * Open/Closed Principle (OCP)
 * Software entities should be open for extension but closed for modification.
 * 
 * Exercise: Implement OCP using interfaces and inheritance
 */

import java.util.List;
import java.util.ArrayList;

// Bad example - violates OCP
enum ShapeTypeBad {
    CIRCLE, RECTANGLE
}

class ShapeBad {
    private ShapeTypeBad type;
    private double radius;
    private double width;
    private double height;

    public ShapeBad(ShapeTypeBad type, double radius, double width, double height) {
        this.type = type;
        this.radius = radius;
        this.width = width;
        this.height = height;
    }

    public double calculateArea() {
        // Violates OCP - needs modification when adding new shapes
        switch (type) {
            case CIRCLE:
                return Math.PI * radius * radius;
            case RECTANGLE:
                return width * height;
            default:
                return 0;
        }
    }
}

// Good example - follows OCP
interface Shape {
    double calculateArea();
}

class Circle implements Shape {
    private double radius;

    public Circle(double radius) {
        this.radius = radius;
    }

    @Override
    public double calculateArea() {
        return Math.PI * radius * radius;
    }
}

class Rectangle implements Shape {
    private double width;
    private double height;

    public Rectangle(double width, double height) {
        this.width = width;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return width * height;
    }
}

class Triangle implements Shape {
    private double base;
    private double height;

    public Triangle(double base, double height) {
        this.base = base;
        this.height = height;
    }

    @Override
    public double calculateArea() {
        return 0.5 * base * height;
    }
}

class AreaCalculator {
    public double calculateTotalArea(List<Shape> shapes) {
        double totalArea = 0;
        for (Shape shape : shapes) {
            totalArea += shape.calculateArea();
        }
        return totalArea;
    }
}

public class OpenClosedPrinciple {
    public static void main(String[] args) {
        System.out.println("=== Open/Closed Principle Demo ===\n");
        
        // Bad example
        System.out.println("Bad Example (Violates OCP):");
        ShapeBad circleBad = new ShapeBad(ShapeTypeBad.CIRCLE, 5, 0, 0);
        ShapeBad rectangleBad = new ShapeBad(ShapeTypeBad.RECTANGLE, 0, 4, 6);
        System.out.println("Circle area: " + circleBad.calculateArea());
        System.out.println("Rectangle area: " + rectangleBad.calculateArea());
        
        // Good example
        System.out.println("\nGood Example (Follows OCP):");
        List<Shape> shapes = new ArrayList<>();
        shapes.add(new Circle(5));
        shapes.add(new Rectangle(4, 6));
        shapes.add(new Triangle(3, 8));
        
        AreaCalculator calculator = new AreaCalculator();
        System.out.println("Total area: " + calculator.calculateTotalArea(shapes));
        
        // Adding new shape without modifying existing code
        shapes.add(new Circle(3));
        System.out.println("Total area after adding new circle: " + calculator.calculateTotalArea(shapes));
    }
}
