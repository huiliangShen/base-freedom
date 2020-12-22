<template>
    <div class="maker-rules">
        <ul class="maker-rules-row">
            <li v-for="(row, i) in rows" :key="i"
                :style="{'height': (row % 100 === 0 || row % 50 === 0) ? '10px' : '5px', 'left': row + 'px'}">
                <span v-if="row && (row % 100 === 0 || row % 50 === 0)">{{row}}</span>
            </li>
        </ul>
        <ul class="maker-rules-col">
            <li v-for="(row, i) in rows" :key="i"
                :style="{'width': (row % 100 === 0 || row % 50 === 0) ? '10px' : '5px', 'top': row + 'px'}">
                <span v-if="row && (row % 100 === 0 || row % 50 === 0)">{{row}}</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'rules',
        data() {
            return {
                rows: []
            }
        },
        mounted() {
            // console.log(process.env.NODE_ENV)
            for (let i = 0; i <= 200; i++) {
                this.rows.push(i * 10)
            }
        }
    }
</script>

<style scoped lang="scss">
    .maker-rules {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 99;
        font-size: 12px;

        .maker-rules-row {
            position: fixed;
            width: 2000px;
            user-select: none;

            li {
                position: absolute;
                width: 1px;
                background: rgb(188, 200, 212);

                span {
                    position: absolute;
                    top: 12px;
                    left: -7px;
                    color: rgb(188, 200, 212);
                    transform: scale(.9);
                }
            }
        }

        .maker-rules-col {
            position: absolute;
            left: 0;
            height: 2000px;
            user-select: none;

            li {
                position: absolute;
                height: 1px;
                background: rgb(188, 200, 212);

                span {
                    position: absolute;
                    left: 12px;
                    top: -6px;
                    color: rgb(188, 200, 212);
                    transform: scale(.9);
                }
            }
        }
    }
</style>
