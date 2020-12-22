import Mock from 'mockjs'
/* eslint-disable */
const {Random} = Mock

Mock.setup({
    timeout: 500
})

function getList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|8': [
                {
                    'id': '@increment',
                    'path': Random.dataImage('200x100', 'Hello Mock.js!'),
                    'name': '@last'
                }
            ],
            'total': 100
        }
    })
}

function getGroup() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|6': [
            {
                'id': '@increment',
                'name': '@last'
            }
        ]
    })
}

function getMusic() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|8': [
                {
                    'id': '@increment',
                    'src|1': ['http://m10.music.126.net/20200409103617/dafb0bfc1dfb7ec2908d133362a541cd/ymusic/8bfa/b225/d9ca/b62debb149be9b2b79cf35a722de2b11.mp3', 'http://music.163.com/song/media/outer/url?id=27571001.mp3', 'http://audio04.dmhmusic.com/71_53_T10046047408_128_4_1_0_sdk-cpm/cn/0206/M00/6C/29/ChR461sZC8yAIP3WADyCYOc_4Yc320.mp3?xcode=59888dc78c11378d626b27d9cf811a77dc49872'],
                    'name': '@last',
                    'timer': 250
                }
            ],
            'total': 100
        }
    })
}

function getVideoArea() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|10': [{
            'id': '@increment',
            'name': '@last',
            'list|15': [
                {
                    'item_id': '@increment',
                    'type|1-3': 3,
                    'timer|200-1000': 1000,
                    'name': '@cname'
                }
            ]
        }]
    })
}

function getShowList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|15': [
                {
                    'id': '@increment',
                    'name': '@last',
                    'author': '@last',
                    'create_at': Random.datetime(),
                    'number|1-20': 20
                }
            ],
            'total': 100
        }
    })
}

function removeShowItems() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

function getShowItem() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'id': '@increment',
            'name': '@last',
            'list|15': [
                {
                    'item_id': '@increment',
                    'type|1-3': 3,
                    'timer|200-1000': 1000,
                    'name': '@cname'
                }
            ]
        }
    })
}

function saveShowItem() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

function groupList() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|5': [
            {
                'name': '@cname',
                'id': '@increment'
            }
        ]
    })
}

function getPrograms() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'list|12': [
                {
                    'id': '@increment',
                    'name': '新增页面1586568403577',
                    'resolution_ratio': '1920*1080',
                    'direction': 0,
                    'author': 1,
                    'size': 149507129,
                    'updated_at': '2020-04-11 09:34:41',
                    'created_at': '2020-04-11 09:34:41',
                    'status': 1,
                    'description': '0',
                    'thumb': '',
                    'state': 0,
                    'program_url': 'show/fHIQgh_1586568401/c0299c566a945122036e2836e29aafa7.php',
                    'is_share': 0,
                    'share_id': 0,
                    'region': 0,
                    'type': 3,
                    'm_id': '0',
                    'program_type': 0,
                    'm_id_use': ',1043,1048,1086,',
                    'g_id': 0,
                    'show_share': 0,
                    'send_num': 0
                }
            ],
            total: 100
        }
    })
}

function addShow() {
    return Mock.mock({
        'code': 0,
        'message': ''
    })
}

function getPC() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': [{
            'code': '11',
            'name': '北京市',
            'children': [{'code': '110101', 'name': '东城区'}, {'code': '110102', 'name': '西城区'}, {
                'code': '110105',
                'name': '朝阳区'
            }, {'code': '110106', 'name': '丰台区'}, {'code': '110107', 'name': '石景山区'}, {
                'code': '110108',
                'name': '海淀区'
            }, {'code': '110109', 'name': '门头沟区'}, {'code': '110111', 'name': '房山区'}, {
                'code': '110112',
                'name': '通州区'
            }, {'code': '110113', 'name': '顺义区'}, {'code': '110114', 'name': '昌平区'}, {
                'code': '110115',
                'name': '大兴区'
            }, {'code': '110116', 'name': '怀柔区'}, {'code': '110117', 'name': '平谷区'}, {
                'code': '110118',
                'name': '密云区'
            }, {'code': '110119', 'name': '延庆区'}]
        }, {
            'code': '12',
            'name': '天津市',
            'children': [{'code': '120101', 'name': '和平区'}, {'code': '120102', 'name': '河东区'}, {
                'code': '120103',
                'name': '河西区'
            }, {'code': '120104', 'name': '南开区'}, {'code': '120105', 'name': '河北区'}, {
                'code': '120106',
                'name': '红桥区'
            }, {'code': '120110', 'name': '东丽区'}, {'code': '120111', 'name': '西青区'}, {
                'code': '120112',
                'name': '津南区'
            }, {'code': '120113', 'name': '北辰区'}, {'code': '120114', 'name': '武清区'}, {
                'code': '120115',
                'name': '宝坻区'
            }, {'code': '120116', 'name': '滨海新区'}, {'code': '120117', 'name': '宁河区'}, {
                'code': '120118',
                'name': '静海区'
            }, {'code': '120119', 'name': '蓟州区'}]
        }, {
            'code': '13',
            'name': '河北省',
            'children': [{'code': '1301', 'name': '石家庄市'}, {'code': '1302', 'name': '唐山市'}, {
                'code': '1303',
                'name': '秦皇岛市'
            }, {'code': '1304', 'name': '邯郸市'}, {'code': '1305', 'name': '邢台市'}, {
                'code': '1306',
                'name': '保定市'
            }, {'code': '1307', 'name': '张家口市'}, {'code': '1308', 'name': '承德市'}, {
                'code': '1309',
                'name': '沧州市'
            }, {'code': '1310', 'name': '廊坊市'}, {'code': '1311', 'name': '衡水市'}]
        }, {
            'code': '14',
            'name': '山西省',
            'children': [{'code': '1401', 'name': '太原市'}, {'code': '1402', 'name': '大同市'}, {
                'code': '1403',
                'name': '阳泉市'
            }, {'code': '1404', 'name': '长治市'}, {'code': '1405', 'name': '晋城市'}, {
                'code': '1406',
                'name': '朔州市'
            }, {'code': '1407', 'name': '晋中市'}, {'code': '1408', 'name': '运城市'}, {
                'code': '1409',
                'name': '忻州市'
            }, {'code': '1410', 'name': '临汾市'}, {'code': '1411', 'name': '吕梁市'}]
        }, {
            'code': '15',
            'name': '内蒙古自治区',
            'children': [{'code': '1501', 'name': '呼和浩特市'}, {'code': '1502', 'name': '包头市'}, {
                'code': '1503',
                'name': '乌海市'
            }, {'code': '1504', 'name': '赤峰市'}, {'code': '1505', 'name': '通辽市'}, {
                'code': '1506',
                'name': '鄂尔多斯市'
            }, {'code': '1507', 'name': '呼伦贝尔市'}, {'code': '1508', 'name': '巴彦淖尔市'}, {
                'code': '1509',
                'name': '乌兰察布市'
            }, {'code': '1522', 'name': '兴安盟'}, {'code': '1525', 'name': '锡林郭勒盟'}, {'code': '1529', 'name': '阿拉善盟'}]
        }, {
            'code': '21',
            'name': '辽宁省',
            'children': [{'code': '2101', 'name': '沈阳市'}, {'code': '2102', 'name': '大连市'}, {
                'code': '2103',
                'name': '鞍山市'
            }, {'code': '2104', 'name': '抚顺市'}, {'code': '2105', 'name': '本溪市'}, {
                'code': '2106',
                'name': '丹东市'
            }, {'code': '2107', 'name': '锦州市'}, {'code': '2108', 'name': '营口市'}, {
                'code': '2109',
                'name': '阜新市'
            }, {'code': '2110', 'name': '辽阳市'}, {'code': '2111', 'name': '盘锦市'}, {
                'code': '2112',
                'name': '铁岭市'
            }, {'code': '2113', 'name': '朝阳市'}, {'code': '2114', 'name': '葫芦岛市'}]
        }, {
            'code': '22',
            'name': '吉林省',
            'children': [{'code': '2201', 'name': '长春市'}, {'code': '2202', 'name': '吉林市'}, {
                'code': '2203',
                'name': '四平市'
            }, {'code': '2204', 'name': '辽源市'}, {'code': '2205', 'name': '通化市'}, {
                'code': '2206',
                'name': '白山市'
            }, {'code': '2207', 'name': '松原市'}, {'code': '2208', 'name': '白城市'}, {'code': '2224', 'name': '延边朝鲜族自治州'}]
        }, {
            'code': '23',
            'name': '黑龙江省',
            'children': [{'code': '2301', 'name': '哈尔滨市'}, {'code': '2302', 'name': '齐齐哈尔市'}, {
                'code': '2303',
                'name': '鸡西市'
            }, {'code': '2304', 'name': '鹤岗市'}, {'code': '2305', 'name': '双鸭山市'}, {
                'code': '2306',
                'name': '大庆市'
            }, {'code': '2307', 'name': '伊春市'}, {'code': '2308', 'name': '佳木斯市'}, {
                'code': '2309',
                'name': '七台河市/**/'
            }, {'code': '2310', 'name': '牡丹江市'}, {'code': '2311', 'name': '黑河市'}, {
                'code': '2312',
                'name': '绥化市'
            }, {'code': '2327', 'name': '大兴安岭地区'}]
        }, {
            'code': '31',
            'name': '上海市',
            'children': [{'code': '310101', 'name': '黄浦区'}, {'code': '310104', 'name': '徐汇区'}, {
                'code': '310105',
                'name': '长宁区'
            }, {'code': '310106', 'name': '静安区'}, {'code': '310107', 'name': '普陀区'}, {
                'code': '310109',
                'name': '虹口区'
            }, {'code': '310110', 'name': '杨浦区'}, {'code': '310112', 'name': '闵行区'}, {
                'code': '310113',
                'name': '宝山区'
            }, {'code': '310114', 'name': '嘉定区'}, {'code': '310115', 'name': '浦东新区'}, {
                'code': '310116',
                'name': '金山区'
            }, {'code': '310117', 'name': '松江区'}, {'code': '310118', 'name': '青浦区'}, {
                'code': '310120',
                'name': '奉贤区'
            }, {'code': '310151', 'name': '崇明区'}]
        }, {
            'code': '32',
            'name': '江苏省',
            'children': [{'code': '3201', 'name': '南京市'}, {'code': '3202', 'name': '无锡市'}, {
                'code': '3203',
                'name': '徐州市'
            }, {'code': '3204', 'name': '常州市'}, {'code': '3205', 'name': '苏州市'}, {
                'code': '3206',
                'name': '南通市'
            }, {'code': '3207', 'name': '连云港市'}, {'code': '3208', 'name': '淮安市'}, {
                'code': '3209',
                'name': '盐城市'
            }, {'code': '3210', 'name': '扬州市'}, {'code': '3211', 'name': '镇江市'}, {
                'code': '3212',
                'name': '泰州市'
            }, {'code': '3213', 'name': '宿迁市'}]
        }, {
            'code': '33',
            'name': '浙江省',
            'children': [{'code': '3301', 'name': '杭州市'}, {'code': '3302', 'name': '宁波市'}, {
                'code': '3303',
                'name': '温州市'
            }, {'code': '3304', 'name': '嘉兴市'}, {'code': '3305', 'name': '湖州市'}, {
                'code': '3306',
                'name': '绍兴市'
            }, {'code': '3307', 'name': '金华市'}, {'code': '3308', 'name': '衢州市'}, {
                'code': '3309',
                'name': '舟山市'
            }, {'code': '3310', 'name': '台州市'}, {'code': '3311', 'name': '丽水市'}]
        }, {
            'code': '34',
            'name': '安徽省',
            'children': [{'code': '3401', 'name': '合肥市'}, {'code': '3402', 'name': '芜湖市'}, {
                'code': '3403',
                'name': '蚌埠市'
            }, {'code': '3404', 'name': '淮南市'}, {'code': '3405', 'name': '马鞍山市'}, {
                'code': '3406',
                'name': '淮北市'
            }, {'code': '3407', 'name': '铜陵市'}, {'code': '3408', 'name': '安庆市'}, {
                'code': '3410',
                'name': '黄山市'
            }, {'code': '3411', 'name': '滁州市'}, {'code': '3412', 'name': '阜阳市'}, {
                'code': '3413',
                'name': '宿州市'
            }, {'code': '3415', 'name': '六安市'}, {'code': '3416', 'name': '亳州市'}, {
                'code': '3417',
                'name': '池州市'
            }, {'code': '3418', 'name': '宣城市'}]
        }, {
            'code': '35',
            'name': '福建省',
            'children': [{'code': '3501', 'name': '福州市'}, {'code': '3502', 'name': '厦门市'}, {
                'code': '3503',
                'name': '莆田市'
            }, {'code': '3504', 'name': '三明市'}, {'code': '3505', 'name': '泉州市'}, {
                'code': '3506',
                'name': '漳州市'
            }, {'code': '3507', 'name': '南平市'}, {'code': '3508', 'name': '龙岩市'}, {'code': '3509', 'name': '宁德市'}]
        }, {
            'code': '36',
            'name': '江西省',
            'children': [{'code': '3601', 'name': '南昌市'}, {'code': '3602', 'name': '景德镇市'}, {
                'code': '3603',
                'name': '萍乡市'
            }, {'code': '3604', 'name': '九江市'}, {'code': '3605', 'name': '新余市'}, {
                'code': '3606',
                'name': '鹰潭市'
            }, {'code': '3607', 'name': '赣州市'}, {'code': '3608', 'name': '吉安市'}, {
                'code': '3609',
                'name': '宜春市'
            }, {'code': '3610', 'name': '抚州市'}, {'code': '3611', 'name': '上饶市'}]
        }, {
            'code': '37',
            'name': '山东省',
            'children': [{'code': '3701', 'name': '济南市'}, {'code': '3702', 'name': '青岛市'}, {
                'code': '3703',
                'name': '淄博市'
            }, {'code': '3704', 'name': '枣庄市'}, {'code': '3705', 'name': '东营市'}, {
                'code': '3706',
                'name': '烟台市'
            }, {'code': '3707', 'name': '潍坊市'}, {'code': '3708', 'name': '济宁市'}, {
                'code': '3709',
                'name': '泰安市'
            }, {'code': '3710', 'name': '威海市'}, {'code': '3711', 'name': '日照市'}, {
                'code': '3713',
                'name': '临沂市'
            }, {'code': '3714', 'name': '德州市'}, {'code': '3715', 'name': '聊城市'}, {
                'code': '3716',
                'name': '滨州市'
            }, {'code': '3717', 'name': '菏泽市'}]
        }, {
            'code': '41',
            'name': '河南省',
            'children': [{'code': '4101', 'name': '郑州市'}, {'code': '4102', 'name': '开封市'}, {
                'code': '4103',
                'name': '洛阳市'
            }, {'code': '4104', 'name': '平顶山市'}, {'code': '4105', 'name': '安阳市'}, {
                'code': '4106',
                'name': '鹤壁市'
            }, {'code': '4107', 'name': '新乡市'}, {'code': '4108', 'name': '焦作市'}, {
                'code': '4109',
                'name': '濮阳市'
            }, {'code': '4110', 'name': '许昌市'}, {'code': '4111', 'name': '漯河市'}, {
                'code': '4112',
                'name': '三门峡市'
            }, {'code': '4113', 'name': '南阳市'}, {'code': '4114', 'name': '商丘市'}, {
                'code': '4115',
                'name': '信阳市'
            }, {'code': '4116', 'name': '周口市'}, {'code': '4117', 'name': '驻马店市'}, {'code': '419001', 'name': '济源市'}]
        }, {
            'code': '42',
            'name': '湖北省',
            'children': [{'code': '4201', 'name': '武汉市'}, {'code': '4202', 'name': '黄石市'}, {
                'code': '4203',
                'name': '十堰市'
            }, {'code': '4205', 'name': '宜昌市'}, {'code': '4206', 'name': '襄阳市'}, {
                'code': '4207',
                'name': '鄂州市'
            }, {'code': '4208', 'name': '荆门市'}, {'code': '4209', 'name': '孝感市'}, {
                'code': '4210',
                'name': '荆州市'
            }, {'code': '4211', 'name': '黄冈市'}, {'code': '4212', 'name': '咸宁市'}, {
                'code': '4213',
                'name': '随州市'
            }, {'code': '4228', 'name': '恩施土家族苗族自治州'}, {'code': '429004', 'name': '仙桃市'}, {
                'code': '429005',
                'name': '潜江市'
            }, {'code': '429006', 'name': '天门市'}, {'code': '429021', 'name': '神农架林区'}]
        }, {
            'code': '43',
            'name': '湖南省',
            'children': [{'code': '4301', 'name': '长沙市'}, {'code': '4302', 'name': '株洲市'}, {
                'code': '4303',
                'name': '湘潭市'
            }, {'code': '4304', 'name': '衡阳市'}, {'code': '4305', 'name': '邵阳市'}, {
                'code': '4306',
                'name': '岳阳市'
            }, {'code': '4307', 'name': '常德市'}, {'code': '4308', 'name': '张家界市'}, {
                'code': '4309',
                'name': '益阳市'
            }, {'code': '4310', 'name': '郴州市'}, {'code': '4311', 'name': '永州市'}, {
                'code': '4312',
                'name': '怀化市'
            }, {'code': '4313', 'name': '娄底市'}, {'code': '4331', 'name': '湘西土家族苗族自治州'}]
        }, {
            'code': '44',
            'name': '广东省',
            'children': [{'code': '4401', 'name': '广州市'}, {'code': '4402', 'name': '韶关市'}, {
                'code': '4403',
                'name': '深圳市'
            }, {'code': '4404', 'name': '珠海市'}, {'code': '4405', 'name': '汕头市'}, {
                'code': '4406',
                'name': '佛山市'
            }, {'code': '4407', 'name': '江门市'}, {'code': '4408', 'name': '湛江市'}, {
                'code': '4409',
                'name': '茂名市'
            }, {'code': '4412', 'name': '肇庆市'}, {'code': '4413', 'name': '惠州市'}, {
                'code': '4414',
                'name': '梅州市'
            }, {'code': '4415', 'name': '汕尾市'}, {'code': '4416', 'name': '河源市'}, {
                'code': '4417',
                'name': '阳江市'
            }, {'code': '4418', 'name': '清远市'}, {'code': '4419', 'name': '东莞市'}, {
                'code': '4420',
                'name': '中山市'
            }, {'code': '4451', 'name': '潮州市'}, {'code': '4452', 'name': '揭阳市'}, {'code': '4453', 'name': '云浮市'}]
        }, {
            'code': '45',
            'name': '广西壮族自治区',
            'children': [{'code': '4501', 'name': '南宁市'}, {'code': '4502', 'name': '柳州市'}, {
                'code': '4503',
                'name': '桂林市'
            }, {'code': '4504', 'name': '梧州市'}, {'code': '4505', 'name': '北海市'}, {
                'code': '4506',
                'name': '防城港市'
            }, {'code': '4507', 'name': '钦州市'}, {'code': '4508', 'name': '贵港市'}, {
                'code': '4509',
                'name': '玉林市'
            }, {'code': '4510', 'name': '百色市'}, {'code': '4511', 'name': '贺州市'}, {
                'code': '4512',
                'name': '河池市'
            }, {'code': '4513', 'name': '来宾市'}, {'code': '4514', 'name': '崇左市'}]
        }, {
            'code': '46',
            'name': '海南省',
            'children': [{'code': '4601', 'name': '海口市'}, {'code': '4602', 'name': '三亚市'}, {
                'code': '4603',
                'name': '三沙市'
            }, {'code': '4604', 'name': '儋州市'}, {'code': '469001', 'name': '五指山市'}, {
                'code': '469002',
                'name': '琼海市'
            }, {'code': '469005', 'name': '文昌市'}, {'code': '469006', 'name': '万宁市'}, {
                'code': '469007',
                'name': '东方市'
            }, {'code': '469021', 'name': '定安县'}, {'code': '469022', 'name': '屯昌县'}, {
                'code': '469023',
                'name': '澄迈县'
            }, {'code': '469024', 'name': '临高县'}, {'code': '469025', 'name': '白沙黎族自治县'}, {
                'code': '469026',
                'name': '昌江黎族自治县'
            }, {'code': '469027', 'name': '乐东黎族自治县'}, {'code': '469028', 'name': '陵水黎族自治县'}, {
                'code': '469029',
                'name': '保亭黎族苗族自治县'
            }, {'code': '469030', 'name': '琼中黎族苗族自治县'}]
        }, {
            'code': '50',
            'name': '重庆市',
            'children': [{'code': '500101', 'name': '万州区'}, {'code': '500102', 'name': '涪陵区'}, {
                'code': '500103',
                'name': '渝中区'
            }, {'code': '500104', 'name': '大渡口区'}, {'code': '500105', 'name': '江北区'}, {
                'code': '500106',
                'name': '沙坪坝区'
            }, {'code': '500107', 'name': '九龙坡区'}, {'code': '500108', 'name': '南岸区'}, {
                'code': '500109',
                'name': '北碚区'
            }, {'code': '500110', 'name': '綦江区'}, {'code': '500111', 'name': '大足区'}, {
                'code': '500112',
                'name': '渝北区'
            }, {'code': '500113', 'name': '巴南区'}, {'code': '500114', 'name': '黔江区'}, {
                'code': '500115',
                'name': '长寿区'
            }, {'code': '500116', 'name': '江津区'}, {'code': '500117', 'name': '合川区'}, {
                'code': '500118',
                'name': '永川区'
            }, {'code': '500119', 'name': '南川区'}, {'code': '500120', 'name': '璧山区'}, {
                'code': '500151',
                'name': '铜梁区'
            }, {'code': '500152', 'name': '潼南区'}, {'code': '500153', 'name': '荣昌区'}, {
                'code': '500154',
                'name': '开州区'
            }, {'code': '500155', 'name': '梁平区'}, {'code': '500156', 'name': '武隆区'}, {
                'code': '500229',
                'name': '城口县'
            }, {'code': '500230', 'name': '丰都县'}, {'code': '500231', 'name': '垫江县'}, {
                'code': '500233',
                'name': '忠县'
            }, {'code': '500235', 'name': '云阳县'}, {'code': '500236', 'name': '奉节县'}, {
                'code': '500237',
                'name': '巫山县'
            }, {'code': '500238', 'name': '巫溪县'}, {'code': '500240', 'name': '石柱土家族自治县'}, {
                'code': '500241',
                'name': '秀山土家族苗族自治县'
            }, {'code': '500242', 'name': '酉阳土家族苗族自治县'}, {'code': '500243', 'name': '彭水苗族土家族自治县'}]
        }, {
            'code': '51',
            'name': '四川省',
            'children': [{'code': '5101', 'name': '成都市'}, {'code': '5103', 'name': '自贡市'}, {
                'code': '5104',
                'name': '攀枝花市'
            }, {'code': '5105', 'name': '泸州市'}, {'code': '5106', 'name': '德阳市'}, {
                'code': '5107',
                'name': '绵阳市'
            }, {'code': '5108', 'name': '广元市'}, {'code': '5109', 'name': '遂宁市'}, {
                'code': '5110',
                'name': '内江市'
            }, {'code': '5111', 'name': '乐山市'}, {'code': '5113', 'name': '南充市'}, {
                'code': '5114',
                'name': '眉山市'
            }, {'code': '5115', 'name': '宜宾市'}, {'code': '5116', 'name': '广安市'}, {
                'code': '5117',
                'name': '达州市'
            }, {'code': '5118', 'name': '雅安市'}, {'code': '5119', 'name': '巴中市'}, {
                'code': '5120',
                'name': '资阳市'
            }, {'code': '5132', 'name': '阿坝藏族羌族自治州'}, {'code': '5133', 'name': '甘孜藏族自治州'}, {
                'code': '5134',
                'name': '凉山彝族自治州'
            }]
        }, {
            'code': '52',
            'name': '贵州省',
            'children': [{'code': '5201', 'name': '贵阳市'}, {'code': '5202', 'name': '六盘水市'}, {
                'code': '5203',
                'name': '遵义市'
            }, {'code': '5204', 'name': '安顺市'}, {'code': '5205', 'name': '毕节市'}, {
                'code': '5206',
                'name': '铜仁市'
            }, {'code': '5223', 'name': '黔西南布依族苗族自治州'}, {'code': '5226', 'name': '黔东南苗族侗族自治州'}, {
                'code': '5227',
                'name': '黔南布依族苗族自治州'
            }]
        }, {
            'code': '53',
            'name': '云南省',
            'children': [{'code': '5301', 'name': '昆明市'}, {'code': '5303', 'name': '曲靖市'}, {
                'code': '5304',
                'name': '玉溪市'
            }, {'code': '5305', 'name': '保山市'}, {'code': '5306', 'name': '昭通市'}, {
                'code': '5307',
                'name': '丽江市'
            }, {'code': '5308', 'name': '普洱市'}, {'code': '5309', 'name': '临沧市'}, {
                'code': '5323',
                'name': '楚雄彝族自治州'
            }, {'code': '5325', 'name': '红河哈尼族彝族自治州'}, {'code': '5326', 'name': '文山壮族苗族自治州'}, {
                'code': '5328',
                'name': '西双版纳傣族自治州'
            }, {'code': '5329', 'name': '大理白族自治州'}, {'code': '5331', 'name': '德宏傣族景颇族自治州'}, {
                'code': '5333',
                'name': '怒江傈僳族自治州'
            }, {'code': '5334', 'name': '迪庆藏族自治州'}]
        }, {
            'code': '54',
            'name': '西藏自治区',
            'children': [{'code': '5401', 'name': '拉萨市'}, {'code': '5402', 'name': '日喀则市'}, {
                'code': '5403',
                'name': '昌都市'
            }, {'code': '5404', 'name': '林芝市'}, {'code': '5405', 'name': '山南市'}, {
                'code': '5406',
                'name': '那曲市'
            }, {'code': '5425', 'name': '阿里地区'}]
        }, {
            'code': '61',
            'name': '陕西省',
            'children': [{'code': '6101', 'name': '西安市'}, {'code': '6102', 'name': '铜川市'}, {
                'code': '6103',
                'name': '宝鸡市'
            }, {'code': '6104', 'name': '咸阳市'}, {'code': '6105', 'name': '渭南市'}, {
                'code': '6106',
                'name': '延安市'
            }, {'code': '6107', 'name': '汉中市'}, {'code': '6108', 'name': '榆林市'}, {
                'code': '6109',
                'name': '安康市'
            }, {'code': '6110', 'name': '商洛市'}]
        }, {
            'code': '62',
            'name': '甘肃省',
            'children': [{'code': '6201', 'name': '兰州市'}, {'code': '6202', 'name': '嘉峪关市'}, {
                'code': '6203',
                'name': '金昌市'
            }, {'code': '6204', 'name': '白银市'}, {'code': '6205', 'name': '天水市'}, {
                'code': '6206',
                'name': '武威市'
            }, {'code': '6207', 'name': '张掖市'}, {'code': '6208', 'name': '平凉市'}, {
                'code': '6209',
                'name': '酒泉市'
            }, {'code': '6210', 'name': '庆阳市'}, {'code': '6211', 'name': '定西市'}, {
                'code': '6212',
                'name': '陇南市'
            }, {'code': '6229', 'name': '临夏回族自治州'}, {'code': '6230', 'name': '甘南藏族自治州'}]
        }, {
            'code': '63',
            'name': '青海省',
            'children': [{'code': '6301', 'name': '西宁市'}, {'code': '6302', 'name': '海东市'}, {
                'code': '6322',
                'name': '海北藏族自治州'
            }, {'code': '6323', 'name': '黄南藏族自治州'}, {'code': '6325', 'name': '海南藏族自治州'}, {
                'code': '6326',
                'name': '果洛藏族自治州'
            }, {'code': '6327', 'name': '玉树藏族自治州'}, {'code': '6328', 'name': '海西蒙古族藏族自治州'}]
        }, {
            'code': '64',
            'name': '宁夏回族自治区',
            'children': [{'code': '6401', 'name': '银川市'}, {'code': '6402', 'name': '石嘴山市'}, {
                'code': '6403',
                'name': '吴忠市'
            }, {'code': '6404', 'name': '固原市'}, {'code': '6405', 'name': '中卫市'}]
        }, {
            'code': '65',
            'name': '新疆维吾尔自治区',
            'children': [{'code': '6501', 'name': '乌鲁木齐市'}, {'code': '6502', 'name': '克拉玛依市'}, {
                'code': '6504',
                'name': '吐鲁番市'
            }, {'code': '6505', 'name': '哈密市'}, {'code': '6523', 'name': '昌吉回族自治州'}, {
                'code': '6527',
                'name': '博尔塔拉蒙古自治州'
            }, {'code': '6528', 'name': '巴音郭楞蒙古自治州'}, {'code': '6529', 'name': '阿克苏地区'}, {
                'code': '6530',
                'name': '克孜勒苏柯尔克孜自治州'
            }, {'code': '6531', 'name': '喀什地区'}, {'code': '6532', 'name': '和田地区'}, {
                'code': '6540',
                'name': '伊犁哈萨克自治州'
            }, {'code': '6542', 'name': '塔城地区'}, {'code': '6543', 'name': '阿勒泰地区'}, {
                'code': '659001',
                'name': '石河子市'
            }, {'code': '659002', 'name': '阿拉尔市'}, {'code': '659003', 'name': '图木舒克市'}, {
                'code': '659004',
                'name': '五家渠市'
            }, {'code': '659006', 'name': '铁门关市'}]
        }]
    })
}

function getWeather() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data': {
            'temperatureLow|5-15': 15,
            'temperatureHigh|15-25': 25,
            'str': '多云转阴',
            'area|1': ['杭州市', '湖州市', '嘉兴市']
        }
    })
}

function getTemplate() {
    return Mock.mock({
        'code': 0,
        'message': '',
        'data|10': [
            {
                'id': '@increment',
                'path': Random.dataImage('200x100', 'Hello Mock.js!'),
                'data': {"img":"","desc":"","name":"","loading":1,"set":[],"type":"pc","mp3":{"name":"","url":""},"slider":{"animate":1,"lock":false,"autoplay":false,"time":5},"style":{"width":1200,"height":600},"pages":[{"id":null,"name":"","style":{"height":720,"width":1280,"size":"1280X720","direction":"horizontal","backgroundColor":"rgba(36,67,167,0.91)","backgroundRepeat":"no-repeat","backgroundImageCrop":null,"backgroundSize":"100% 100%","backgroundImage":""},"layers":[{"key":"","name":"图片组件","type":"img","icon":"iconfont icon-tupian","data":{"id":19,"path":"data:image/png;base64,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","name":"Gonzalez","src":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAALL0lEQVR4Xu2aeXxOVxrHf4ktBI0gJdRStbZmbImpJWKUIhm1FSVqDcWI0pAgJIglQtL41NrBBCUjYaT2nRIS+1JrSiqIfYsIQpJ+nsP7Tt43y9vczzU+znnuf2+cc+59vs/zvWe5rBp1HpEJvpgAE8iRgBULwpXBBHInwIJwdTCBPAiwIFweTIAF4RpgAtoI8AyijRv3UoQAC6JIojlMbQRYEG3cuJciBFgQRRLNYWojwIJo48a9FCHAgiiSaA5TGwEWRBs37qUIARZEkURzmNoIsCDauHEvRQiwIIokmsPURoAF0caNeylCgAVRJNEcpjYCLIg2btxLEQIsiCKJ5jC1EWBBtHHjXooQYEEUSTSHqY0AC6KNG/dShAALokiiOUxtBFgQbdy4lyIEWBBFEs1haiPAgmjjxr0UIcCCKJJoDlMbARZEGzfupQgBFkSRRHOY2giwINq4cS9FCLAgiiSaw9RGgAXRxo17KUKABVEk0RymNgIsiDZu3EsRAiyIIonmMLURYEG0ceNeihBgQRRJNIepjQALoo0b91KEAAuiSKI5TG0EWBBt3LiXIgRYEEUSzWFqI8CCaOPGvRQhwIIokmgOUxsBFkQbN+6lCAEpBalS4X2UKVUS5y5dxZOnz0xS+ddaVcXvk+cTLKa4drUP0OrTetgddxJn4hPRuml91KxaEcvW7URySqrF/uYNChcqiL/UfHX/I7/G59ifnpue/97Dx0i4djPf9zDv4OhQGp3bNMHxs5cQc+ysxfHs7UqgTdMG2LA7Dimppuxy6kw8CxUsiGNnfkNGZqbF8d+1BlIK8tOs0ahRtQLGBC/B7thTJjmJXR0CK2srNO460mKuhnm4o2+nz7BuRyymzo+AYdwh/nNzLfC8Bq1asRxWh/mKJjP/FYXIzfuzNad/p3YPk5+gdb/xFp/RUgP3ls7w/2dPHDp1EcMmzbPUHJFzxgpBDx4/B6/AhRbbx0WFwtrKCh2HTsH1W/cstn/XGrAgeWTsTQpy5/4jtPf0N7n7B+XKYO1cP/G3tyUIvRA6f94EC1Ztxqa9hy3W88HVs1GwQAG4evhmm60tdn4HGigvCL0tw/wGoVxZe2RkZODqjbviTUsFbEmQksWLIcxvsFh2FShgLYp62oL/YO+h0zmmPusMQg0G+c3B8XOXjW1Dxw1Cs4Z1sglCS72ZY/rDobQdMjMyxZvaK3CB8Y1Ny6K5E4eiSkUH0fdS4g0sjNiMfUfOwHwGoWdYNGU4aLkXvHgNNuw+ZPKsQ3q6oUd7F4Qs/S+id8aC7j3GsytqVHEUS6kbd+7j+/Bo48y8b+VM2BQpDKcu374D5Z7/R5RaEHoDxv+eZELF6+sOoJUyLbEosbuWTUehggXEnsLKygolbIsi9dlztPTwxZBebnkusbYungIqziepz3A/OQU0A+RU+IYHMAjy9HkaihYpjLO/JaKPT4j4Z3qWvT8F4dnzNBSzKWKcQcrav4cNiwLEMubW3YfiWemeaS9eolWfcaI9xUDP/TI9XfSjfQz9vUUvH7R3dTIusYJ+jMSqEB8hx/pdcZg8d1W2ipk68mu0adYA81ZuxNI127Fn+QzYFrMRL4yXL9NR3sEeL16mo9lXo8ULhe5dvJgNnP/EkjX/5fn2e0gtSG54aTNJgowe2AXd2jXHxYTr6OUdLJqvDBmD6pUdxRuUCjG3PYijgz0mDPtKiNW6n58olu/6d0IPtxa4knQbXYdPy3Z7gyBUbHRR8dMyi36P6PMFPDq0xJqtMejyeVOjIIZZ5fDpeAwNmCv6GfYpUVv2i9nCZ9CX4jnaDfRH2osXmBcwFE51a+CHFevFZp/2IBcSrqGyo4MQ8eddcZiSgxw0trkgh6JCxYuDZlXax/h4dkW92tUwMWw54q8kYcviybArURx/6zbq7VfzG3gCqQU5cOwcEm/cMcHWvX1z4wwSHjQKdT6qJN7GT589F+2KFbURb2laJiVcv5WrIB1aNUY7l0bYefAkfGctFX1pCbRxUYAo0qY9RucpyMr1e4QUOw4cx9jZ4WL2oOLtNDQQ0fMnGAVZv9Af5cqUwriQcGyPOS7GJGlp+UendCRj2+YNTZ4j640NSyzD3xKT7qDL8Km5lpK5IMuDvVHrw4qiferT5zh8+iJClq5D0u1XG3J6Vpqxcor3DdTr/31IqQWxdIpFy42PKpcXiTc/Dt5/9AwepaTmKkgPNxe0cK4r3vgzFkWKxBUuVAgxEcFiqfNpt+/yFMR98CTRlq6gH6Mw/pvu4mRsfOgy0NLNsEk3LOM8/ebgxOv9irurM/yH90TCtVtITLotnmPttgOYvnB1tnuaC0INJny/HFv2Hc2x2MwFoaVd745/h5urMypXcBBLPZqB+48NFUffNJs52NvBtfer0znZLqUFCfYZAFfnujh44jy8piwQuaXljVsLJ0Ru2Y8PK5XLVZD6daphUPe2yPpGNhTjvYfJaDtgYp6C0NJqtu9AuDh9gvT0DLHJ7+sbght3HpgI8u8Zo/Bx9UqI2hqDoNcihoz1RPNGH2NP3ClcvnYL/bu0NlnWjR/SA1+0aiyk+TX+inGJtWnvEYzs21Hcr9u308WzU8HTPiX2xHncfZBsssSi/j9MHILzl6+JY25ra2tEho1FJceyxpmv0SfVYVfSFjsOnJDNDRGP0oLQtxL6tpGZmYnYkxfwOCUVnzWtL8C4efqju5tLroLQBntH+DSxHCPBEq7exJftmovfYeHRWPHzbouC0AkafXegyyAV7XuyziBOdatjXsAw8YzrdhxE0SJF0NalofjdbcQMPEhOwbalgaLQaZ9x5fpt8XGThPPwnoXqVRxNvoMY9iev9iwTQYcW3du7GO9vPoPsDJ8GOq3b8stR3H3wCJ1aNxGb9oiNv2BhxCaxSac9Sj/fUCGjbJeUgqyY5S2OXr2DFmc7cjX/UNjzH67w6t1BFBRd9HYNWxaNVRv2Ylgvd/Tt/L8PhYZxDR8KqXhn+Q4Up050UdHSBjhwXkSOdWIQgk6j3AcHiDa0hqev3fNXbsSSNdtRqmRxUfBZv4PQnoNO1EgCuugUiY6TDUe09IV/kpeHkJOux0+eYkX0LjGeYVaLPXkewycvEN8saGP9Xglb8fWb9lB0WEFykVDmgtA+y3tAZyGJ4bp68y56jpqJtLQX2LokUAjT4ZtJYgaS7ZJSkPwmiQqv5uuN6IWE6+JEKj9XhfdLixOpUxd+z3ffP3sfwzPSUSudHuV0VatUXhQtFXB+LtuiNsY9WNj4wWjSoHa2WZBmW7sStrh89aaUIuTGiwXJTyVJ3nZRoBfq1aoqlkz031xoFlP9YkFUr4As8dOpHi01126LEXsMviTdpHNimYBeBHgG0YskjyMlARZEyrRyUHoRYEH0IsnjSEmABZEyrRyUXgRYEL1I8jhSEmBBpEwrB6UXARZEL5I8jpQEWBAp08pB6UWABdGLJI8jJQEWRMq0clB6EWBB9CLJ40hJgAWRMq0clF4EWBC9SPI4UhJgQaRMKwelFwEWRC+SPI6UBFgQKdPKQelFgAXRiySPIyUBFkTKtHJQehFgQfQiyeNISYAFkTKtHJReBFgQvUjyOFISYEGkTCsHpRcBFkQvkjyOlARYECnTykHpRYAF0YskjyMlARZEyrRyUHoRYEH0IsnjSEmABZEyrRyUXgRYEL1I8jhSEmBBpEwrB6UXARZEL5I8jpQEWBAp08pB6UWABdGLJI8jJQEWRMq0clB6EWBB9CLJ40hJgAWRMq0clF4EWBC9SPI4UhJgQaRMKwelFwEWRC+SPI6UBFgQKdPKQelFgAXRiySPIyWBPwBsjCgA0M5YiwAAAABJRU5ErkJggg==","originalWidth":200,"originalHeight":100},"style":{"width":200,"height":100,"left":104,"top":79,"transform":""},"estyle":{"borderRadius":0,"borderStyle":"none","opacity":1}},{"key":"","name":"跑马灯组件","type":"run","icon":"iconfont icon-paomadeng-01","data":{"text":"这是跑马灯文字hgjhgty","direction":"left","style":{"letterSpacing":0,"color":"rgba(0,0,0,1)","fontSize":16,"lineHeight":1.5,"fontWeight":"","fontStyle":""},"originalWidth":300,"originalHeight":20},"style":{"width":300,"height":20,"left":470,"top":139,"transform":""},"estyle":{"borderRadius":0,"borderStyle":"none","opacity":1}},{"key":"","name":"文本组件","type":"text","icon":"iconfont icon-wenben","data":{"text":"456hrtfth65","style":{"letterSpacing":0,"color":"rgba(0,0,0,1)","textDecoration":"normal","textAlign":"left","fontSize":18,"lineHeight":1.5,"fontWeight":"","fontStyle":""},"originalWidth":130,"originalHeight":27},"style":{"width":130,"height":27,"left":546,"top":259,"transform":""},"estyle":{"borderRadius":0,"borderStyle":"none","opacity":1}},{"key":"","name":"图片组件","type":"img","icon":"iconfont icon-tupian","data":{"id":37,"path":"data:image/png;base64,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","name":"Harris","src":"data:image/png;base64,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","originalWidth":200,"originalHeight":100},"style":{"left":555,"top":488,"width":200,"height":100,"transform":"rotate(56deg)"},"estyle":{"opacity":1,"borderWidth":1,"borderStyle":"none","borderRadius":0,"borderColor":"rgba(0,0,0,1)","backgroundColor":"rgba(0,0,0,0)"}}],"slider":{"animate":1,"autoplay":false,"lock":false,"time":5}}]}
            }
        ]
    })
}

Mock.mock(/\/api\/diffusion\/material\/listMaterialPage/, 'get', getList)
Mock.mock(/\/api\/diffusion\/system\/userListMaterial/, 'get', getGroup)
Mock.mock(/\/api\/diffusion\/material\/getMusic/, 'get', getMusic)
Mock.mock(/\/api\/diffusion\/material\/getVideoArea/, 'get', getVideoArea)
Mock.mock(/\/api\/diffusion\/material\/getShowList/, 'get', getShowList)
Mock.mock(/\/api\/diffusion\/material\/removeShowItems/, 'post', removeShowItems)
Mock.mock(/\/api\/diffusion\/material\/getShowItem/, 'get', getShowItem)
Mock.mock(/\/api\/diffusion\/material\/saveShowItem/, 'post', saveShowItem)
Mock.mock(/\/api\/diffusion\/material\/groupList/, 'get', groupList)
Mock.mock(/\/api\/diffusion\/material\/getPrograms/, 'get', getPrograms)
Mock.mock(/\/api\/diffusion\/material\/addShow/, 'post', addShow)
Mock.mock(/\/api\/diffusion\/material\/getPC/, 'get', getPC)
Mock.mock(/\/api\/diffusion\/material\/getWeather/, 'get', getWeather)
Mock.mock(/\/api\/diffusion\/material\/getTemplate/, 'get', getTemplate)
