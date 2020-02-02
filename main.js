window.onload = function () {
    new Vue({
        el: '#app',
        data: {
            notas:[
            
        
            ],
            nueva:'',
            query:''
        },
        mounted() {
            if(localStorage.notas){
                this.notas=JSON.parse(localStorage.getItem("notas"));
            
            }
        },
        methods: {
            nuevaTarea: function () {

                this.notas.push({ pos: (this.notas.length), tarea: this.nueva, prioridad: 2, fecha: new Date(), completada: false })
                localStorage.setItem("notas", JSON.stringify(this.notas));

            },

            borrar: function (posicion) {
                this.notas.splice(posicion, 1);
                for (var x = 0; x < this.notas.length; x++) {
                    this.notas[x].pos = x;
                }
                localStorage.setItem("notas", JSON.stringify(this.notas));
            },

            borrarCompletada: function () {
                for (var i = 0; i < this.notas.length; i++) {
                    for (var x = 0; x < this.notas.length; x++) {
                        if (this.notas[x].completada) {
                            this.notas.splice(x, 1);
                        }
                    }
                    for (var x = 0; x < this.notas.length; x++) {
                        this.notas[x].pos = x;
                    }
                    localStorage.setItem("notas", JSON.stringify(this.notas));
                }
            },
            cambiarPrioridad: function (prio, pos) {
                this.notas[pos].prioridad = prio;
            },           
            completar: function (pos) {
                if (this.notas[pos].completada == false) {
                    this.notas[pos].completada = true;
                } else {
                    this.notas[pos].completada = false;
                }
            },
            fechacomputada: function (nota) {
                return moment(nota.fecha, "YYYYMMDD").fromNow();
            }
        },
        computed: {
            completadas: function () {
                var completadas = this.notas.filter(function (nota) {
                    return nota.completada == false;
                })
                return completadas.length;
            },

            ordenados: function () {
                var vm = this;
                var ordenar = _.orderBy(this.notas, ['prioridad'], ['desc']);
                return ordenar.filter(function (nota) {
                    return nota.tarea.toLowerCase().indexOf(vm.query.toLowerCase()) !== -1
                })
            }
        }

    });
}
