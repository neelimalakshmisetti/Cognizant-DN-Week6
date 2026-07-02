package design_patterns;

/**
 * Factory Pattern - Creational Pattern
 * Defines an interface for creating an object but lets subclasses decide which class to instantiate.
 * 
 * Exercise: Implement Factory pattern for shape creation
 */

interface Shape {
    void draw();
}

class Circle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Circle");
    }
}

class Rectangle implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Rectangle");
    }
}

class Square implements Shape {
    @Override
    public void draw() {
        System.out.println("Drawing a Square");
    }
}

class ShapeFactory {
    public Shape getShape(String shapeType) {
        if (shapeType == null) {
            return null;
        }
        if (shapeType.equalsIgnoreCase("CIRCLE")) {
            return new Circle();
        } else if (shapeType.equalsIgnoreCase("RECTANGLE")) {
            return new Rectangle();
        } else if (shapeType.equalsIgnoreCase("SQUARE")) {
            return new Square();
        }
        return null;
    }
}

public class FactoryPattern {
    public static void main(String[] args) {
        System.out.println("=== Factory Pattern Demo ===\n");
        
        ShapeFactory shapeFactory = new ShapeFactory();
        
        Shape circle = shapeFactory.getShape("CIRCLE");
        circle.draw();
        
        Shape rectangle = shapeFactory.getShape("RECTANGLE");
        rectangle.draw();
        
        Shape square = shapeFactory.getShape("SQUARE");
        square.draw();
    }
}
