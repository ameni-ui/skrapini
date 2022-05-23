export class ScrapedProduct {
    constructor(
        public id:number,
        public name:string,
        public url:string,
        public imgUrl:string,
        public shop:string,
        public price:number,
        public date:string
    ){}
}
