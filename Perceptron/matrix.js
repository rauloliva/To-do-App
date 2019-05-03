class Matrix{
    constructor(rows,cols){
        this.rows = rows
        this.cols = cols
        this.matrix = []
        this.init()
    }

    init(){
        for (let i = 0; i < this.rows; i++) {
            this.matrix[i] = []
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = 0
            }
        }
    }

    randomize(){
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.matrix[i][j] = Math.floor(Math.random() * 10)
            }
        }
    }

    scalar(n){
        this.matrix.forEach(row => {
            row.forEach(value => {
                value += n
            })
        });
    }
}



