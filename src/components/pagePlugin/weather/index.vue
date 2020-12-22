<template>
    <div class="maker-layer-weather-content">
        <div v-if="!weather" class="weather-box">请选择地区</div>
        <div v-else class="weather-box" :style="mstyle">
            {{weather.area}} {{weather.str}} {{weather.temperatureLow + '°C'}}~{{weather.temperatureHigh + '°C'}}
        </div>
    </div>
</template>

<script>
    import {getWeather} from '@/api'
    import {ERROR_CODE} from '@/api/config'
    import {transform} from '@/helper'

    const NEEDPX = ['fontSize']

    export default {
        name: 'pageWeatherPlugin',
        data() {
            return {
                weather: null,
                area: ''
            }
        },
        props: {
            layer: {
                type: Object,
                default: {}
            }
        },
        computed: {
            mstyle() {
                let {style} = this.layer.data
                if (!style) {
                    return
                }
                // console.log('2', estyle)
                let result = ''
                for (const key in style) {
                    // console.log(transform(key))
                    if (NEEDPX.includes(key)) {
                        result += `${transform(key)}: ${style[key]}px;`
                    } else {
                        result += `${transform(key)}: ${style[key]};`
                    }
                }
                return result
            }
        },
        watch: {
            layer: {
                handler(val) {
                    if (!val) {
                        return
                    } else if (!val.data.area || !val.data.area.length) {
                        this.weather = null
                        return
                    }

                    if (this.area === val.data.area.toString()) {
                        return
                    }
                    this.area = val.data.area.toString()
                    this.getAreaWeather(val.data.area)
                },
                deep: true
            }
        },
        methods: {
            getAreaWeather(list) {
                const area = list.join('-')
                /* getWeather(req)
                     .then(res => {
                         console.log(res.data)
                         if (res.code === ERROR_CODE) {
                             this.weather = res.data
                         }
                     }) */
                this.weather = {
                    'temperatureLow': 10,
                    'temperatureHigh': 25,
                    'str': '多云转阴',
                    'area': area
                }
            }
        }
    }
</script>

<style scoped lang="scss">
    .maker-layer-weather-content {
        width: 100%;
        height: 100%;

        .weather-box {
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
</style>
