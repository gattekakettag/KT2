abstract class Publisher{
    constructor(public title: string,
        public author: string,
        public pubYear: number,
        public copies: number) {}

    getTitle(): string{
        return this.title;
    }

    setTitle(title: string): void{
        this.title = title;
    }

    getAuthor(): string{
        return this.author;
    }

    setAuthor(author: string): void{
        this.author = author;
    }

    getPubYear(): number{
        return this.pubYear;
    }

    setPubYear(pubYear: number): void{
        this.pubYear = pubYear;
    }

    getCopies(): number{
        return this.copies;
    }

    setCopies(copies: number): void{
        this.copies = copies;
    }
}

class Book extends Publisher{
    constructor(public title: string, 
    public author: string, 
    public pubYear: number, 
    public copies: number, 
    public pages: number){
        super(title, author, pubYear, copies);
    }
}

class Magazine extends Publisher{
    constructor(public title: string, 
    public author: string, 
    public pubYear: number, 
    public copies: number, 
    public issue: number){
        super(title, author, pubYear, copies);
    }
}

interface Reception{
    delivery(item: Publisher): void;
    receive(item: Publisher): void;
}

class Reader implements Reception{
    items: Publisher[] = [];

    constructor(public firstName: string, 
    public lastName: string) {}

    delivery(item: Publisher): void{
        if (item.getCopies() > 0 && this.items.length < 3){
            this.items.push(item);
            item.setCopies(item.getCopies()-1);
            console.log(`${item.getTitle()} выдана человеку ${this.firstName} ${this.lastName}`);
        }else{
            console.log("Невозможно выдать");
        }
    }


    receive(item: Publisher): void{
        const index = this.items.indexOf(item);
        if (index !== -1){
            this.items.splice(index, 1);
            item.setCopies(item.getCopies() + 1);
            console.log(`${item.getTitle()} принята от человека ${this.firstName} ${this.lastName}`);
        }else{
            console.log("Нет у этого человека");
        }
    }
}


class Library{
    publications: Publisher[] = [];

    addPublication(publication: Publisher): void{
        this.publications.push(publication);
    }

    removePublication(publication: Publisher): void{
        const index = this.publications.indexOf(publication);
        if (index !== -1) {
            this.publications.splice(index, 1);
        }
    }
}

const book = new Book("Книга", "Автор", 2000, 5, 100);
const magazine = new Magazine("Журнал", "Издатель", 2000, 5, 5);

const reader = new Reader("Имя", "Фамилия");
const library = new Library();

library.addPublication(book);
library.addPublication(magazine);

reader.delivery(book);
reader.delivery(magazine);

reader.receive(book);
reader.receive(magazine);

//Выводит вот так: 
//[LOG]: "Книга выдана человеку Имя Фамилия" 
//[LOG]: "Журнал выдана человеку Имя Фамилия" 
//[LOG]: "Книга принята от человека Имя Фамилия" 
//[LOG]: "Журнал принята от человека Имя Фамилия" 
