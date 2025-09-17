class Course{
    constructor(title, length, price){
        this.title = title;
        this.length = length;
        this.coursePrice = price;
    }

    $price;

    get coursePrice(){
        return `\$${this.$price}`;
    }

    set coursePrice(value){
        if(value && value > 0){
            this.$price = value;
        }
    }

    valueForBuck(){
        return this.length/this.price;
    }

    toString(){
        return `${this.title} which lasts ${this.length}hours for only \$${this.price}!`;
    }
}

class PracticalCource extends Course {
    constructor(title, length, price, numOfExercises){
        super(title, length, price);
        this.numberOfExercises = numOfExercises;
    }
}

class TheoreticalCourse extends Course {
    constructor(title, length, price){
        super(title, length, price);
    }

    publish(){
        console.log('smt');
    }
}


class CourseFactory{
    static createCourse(title, length, price){
        return new Course(title, length, price)
    }

    static createPracticalCourse(title, length, price, numberOfExercises){
        return new PracticalCource(title, length, price, numberOfExercises);
    }

    static createTheoreticalCourse(title, lenght, price){
        return new TheoreticalCourse(title, lenght, price);
    }
}


class App{
    static solve(){
        const course1 = CourseFactory.createCourse('course 1', 30, 100.99);
        const course2 = CourseFactory.createCourse('course 2', 20, 199.99);

        console.log(course1);
        console.log(course2);

        console.log(course1.valueForBuck());
        console.log(course1.toString());
    }

    static solveTwo(){
        const practical = CourseFactory.createPracticalCourse('practical', 200, 50, 75);
        const theoretical = CourseFactory.createTheoreticalCourse('theoretical', 120, 30);

        console.log(practical.numberOfExercises);
        console.log(theoretical.publish());
    }
}