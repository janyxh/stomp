
//路径配置
require.config({ 
    paths: {
        echarts: 'http://echarts.baidu.com/build/dist'
    }
});
require(
    [
        'echarts',
        'echarts/chart/map' //按需加载模块
    ],
    function (ec) {
        var myChart = ec.init(document.getElementById('main'));

        var option = {
            title : {
                x:'center',
                y:'top'
            },

            tooltip : {
                trigger: 'item',
                backgroundColor: 'rgba(255,255,255,0.9)',
                borderColor: '#72d8e5',
                borderWidth: 2,
                padding: 10,
                textStyle: {
                    color: '#666'
                },
                formatter:function (params,ticket,callback) {
                	var value=0;
                	var num=0;
                	if(params.value!='-'){ 
                		value=params.value;
                	} 
                	if(typeof(params.data.num)!="undefined"){ 
                		num=params.data.num;
                	}    
                    var res = params.name+'<br/>';
                    res+='---------------'+'<br/>';
                    res+='排名:'+num+'<br/>';
                    res+='设备数：'+value+'<br/>';
                    setTimeout(function (){callback(ticket, res);}, 1000);
                    return 'loading';
                } 
            },  
            dataRange: {
                min: 0,
                max: 1000,  
                text:['设备分布数：高','低'],
                realtime: false,
                calculable : false,
                splitNumber: 6,
                itemGap: 3,
                orient: 'horizontal',
                color: ['#4fcedf','#6ed7e5','#87dfeb','#a1e6ef','#b5ebf2','#d0f2f6']
            },

            series : [
                {
                    name: '',
                    type: 'map',
                    mapType: 'world',
                    roam: false,
                    mapLocation: {
                        y : 60
                    },
                    itemStyle:{
                        emphasis:{label:{show:true}}
                    },
                    data:[{"name":"China","value":41019,"num":1},{"name":"cn","value":18813,"num":2},{"name":"其他","value":9492,"num":3},{"name":"United Kingdom","value":1675,"num":4},{"name":"158","value":418,"num":5},{"name":"289","value":310,"num":6},{"name":"新加坡","value":303,"num":7},{"name":"china","value":224,"num":8},{"name":"119","value":199,"num":9},{"name":"United States of America","value":198,"num":10},{"name":"224","value":189,"num":11},{"name":"340","value":165,"num":12},{"name":"131","value":158,"num":13},{"name":"270","value":156,"num":14},{"name":"75","value":153,"num":15},{"name":"233","value":151,"num":16},{"name":"133","value":128,"num":17},{"name":"373","value":126,"num":18},{"name":"271","value":107,"num":19},{"name":"India","value":107,"num":20},{"name":"132","value":97,"num":21},{"name":"Spain","value":95,"num":22},{"name":"Thailand","value":86,"num":23},{"name":"150","value":83,"num":24},{"name":"Australia","value":80,"num":25},{"name":"Malaysia","value":75,"num":26},{"name":"138","value":71,"num":27},{"name":"Ireland","value":69,"num":28},{"name":"179","value":66,"num":29},{"name":"111","value":65,"num":30},{"name":"Netherlands","value":63,"num":31},{"name":"191","value":63,"num":32},{"name":"332","value":60,"num":33},{"name":"349","value":56,"num":34},{"name":"291","value":56,"num":35},{"name":"60","value":55,"num":36},{"name":"159","value":52,"num":37},{"name":"305","value":51,"num":38},{"name":"303","value":51,"num":39},{"name":"219","value":49,"num":40},{"name":"268","value":48,"num":41},{"name":"326","value":47,"num":42},{"name":"??","value":46,"num":43},{"name":"亚太地区","value":44,"num":44},{"name":"192","value":43,"num":45},{"name":"257","value":43,"num":46},{"name":"301","value":41,"num":47},{"name":"293","value":41,"num":48},{"name":"48","value":39,"num":49},{"name":"169","value":37,"num":50},{"name":"290","value":36,"num":51},{"name":"South Korea","value":36,"num":52},{"name":"New Zealand","value":36,"num":53},{"name":"195","value":35,"num":54},{"name":"78","value":33,"num":55},{"name":"France","value":32,"num":56},{"name":"315","value":32,"num":57},{"name":"Germany","value":32,"num":58},{"name":"367","value":32,"num":59},{"name":"261","value":32,"num":60},{"name":"226","value":31,"num":61},{"name":"331","value":31,"num":62},{"name":"275","value":31,"num":63},{"name":"128","value":31,"num":64},{"name":"309","value":30,"num":65},{"name":"Israel","value":30,"num":66},{"name":"269","value":30,"num":67},{"name":"156","value":29,"num":68},{"name":"Bulgaria","value":28,"num":69},{"name":"129","value":28,"num":70},{"name":"Italy","value":28,"num":71},{"name":"295","value":27,"num":72},{"name":"338","value":26,"num":73},{"name":"317","value":25,"num":74},{"name":"Sweden","value":25,"num":75},{"name":"155","value":25,"num":76},{"name":"348","value":24,"num":77},{"name":"Vietnam","value":24,"num":78},{"name":"194","value":23,"num":79},{"name":"278","value":23,"num":80},{"name":"Portugal","value":23,"num":81},{"name":"Hungary","value":23,"num":82},{"name":"其他","value":23,"num":83},{"name":"365","value":22,"num":84},{"name":"240","value":20,"num":85},{"name":"Japan","value":18,"num":86},{"name":"Canada","value":18,"num":87},{"name":"Greece","value":18,"num":88},{"name":"342","value":17,"num":89},{"name":"118","value":15,"num":90},{"name":"200","value":15,"num":91},{"name":"302","value":15,"num":92},{"name":"Ukraine","value":14,"num":93},{"name":"Argentina","value":14,"num":94},{"name":"Turkey","value":14,"num":95},{"name":"Brazil","value":13,"num":96},{"name":"印度尼西亚","value":13,"num":97},{"name":"127","value":13,"num":98},{"name":"218","value":13,"num":99},{"name":"Norway","value":13,"num":100},{"name":"178","value":13,"num":101},{"name":"Denmark","value":12,"num":102},{"name":"Pakistan","value":11,"num":103},{"name":"马耳他","value":11,"num":104},{"name":"176","value":11,"num":105},{"name":"234","value":10,"num":106},{"name":"193","value":10,"num":107},{"name":"Russia","value":10,"num":108},{"name":"203","value":9,"num":109},{"name":"United Arab Emirates","value":9,"num":110},{"name":"Cyprus","value":8,"num":111},{"name":"107","value":8,"num":112},{"name":"Poland","value":8,"num":113},{"name":"Iran","value":7,"num":114},{"name":"187","value":7,"num":115},{"name":"Belgium","value":7,"num":116},{"name":"Lebanon","value":6,"num":117},{"name":"346","value":6,"num":118},{"name":"Chile","value":6,"num":119},{"name":"Mexico","value":6,"num":120},{"name":"288","value":6,"num":121},{"name":"Slovenia","value":6,"num":122},{"name":"180","value":6,"num":123},{"name":"South Africa","value":6,"num":124},{"name":"Romania","value":5,"num":125},{"name":"323","value":5,"num":126},{"name":"马恩岛","value":5,"num":127},{"name":"273","value":5,"num":128},{"name":"354","value":5,"num":129},{"name":"262","value":5,"num":130},{"name":"Morocco","value":5,"num":131},{"name":"Oman","value":4,"num":132},{"name":"Philippines","value":4,"num":133},{"name":"Brunei","value":4,"num":134},{"name":"Austria","value":4,"num":135},{"name":"Sri Lanka","value":4,"num":136},{"name":"316","value":4,"num":137},{"name":"Finland","value":4,"num":138},{"name":"Switzerland","value":4,"num":139},{"name":"Qatar","value":4,"num":140},{"name":"104","value":4,"num":141},{"name":"267","value":3,"num":142},{"name":"205","value":3,"num":143},{"name":"巴林","value":3,"num":144},{"name":"泽西岛","value":3,"num":145},{"name":"143","value":3,"num":146},{"name":"Lithuania","value":3,"num":147},{"name":"300","value":3,"num":148},{"name":"168","value":3,"num":149},{"name":"捷克","value":3,"num":150},{"name":"41","value":3,"num":151},{"name":"Macedonia","value":3,"num":152},{"name":"141","value":3,"num":153},{"name":"Uruguay","value":3,"num":154},{"name":"安道尔","value":3,"num":155},{"name":"Kuwait","value":3,"num":156},{"name":"175","value":3,"num":157},{"name":"Azerbaijan","value":3,"num":158},{"name":"146","value":2,"num":159},{"name":"213","value":2,"num":160},{"name":"Moldova","value":2,"num":161},{"name":"Kenya","value":2,"num":162},{"name":"非洲地区","value":2,"num":163},{"name":"Kazakhstan","value":2,"num":164},{"name":"毛里求斯","value":2,"num":165},{"name":"Croatia","value":2,"num":166},{"name":"Bosnia and Herzegovina","value":2,"num":167},{"name":"77","value":2,"num":168},{"name":"Montenegro","value":2,"num":169},{"name":"Puerto Rico","value":2,"num":170},{"name":"352","value":2,"num":171},{"name":"Latvia","value":2,"num":172},{"name":"276","value":1,"num":173},{"name":"321","value":1,"num":174},{"name":"欧盟","value":1,"num":175},{"name":"保留地址","value":1,"num":176},{"name":"363","value":1,"num":177},{"name":"NZ","value":1,"num":178},{"name":"法罗群岛","value":1,"num":179},{"name":"根西岛","value":1,"num":180},{"name":"157","value":1,"num":181},{"name":"134","value":1,"num":182},{"name":"Georgia","value":1,"num":183},{"name":"Colombia","value":1,"num":184},{"name":"Estonia","value":1,"num":185},{"name":"263","value":1,"num":186},{"name":"Costa Rica","value":1,"num":187},{"name":"局域网","value":1,"num":188}],  
                    nameMap : {"Afghanistan":"阿富汗","Angola":"安哥拉","Albania":"阿尔巴尼亚","United Arab Emirates":"阿联酋","Argentina":"阿根廷","Armenia":"亚美尼亚","French Southern and Antarctic Lands":"法属南半球和南极领地","Australia":"澳大利亚","Austria":"奥地利","Azerbaijan":"阿塞拜疆","Burundi":"布隆迪","Belgium":"比利时","Benin":"贝宁","Burkina Faso":"布基纳法索","Bangladesh":"孟加拉国","Bulgaria":"保加利亚","The Bahamas":"巴哈马","Bosnia and Herzegovina":"波斯尼亚和黑塞哥维那","Belarus":"白俄罗斯","Belize":"伯利兹","Bermuda":"百慕大","Bolivia":"玻利维亚","Brazil":"巴西","Brunei":"文莱","Bhutan":"不丹","Botswana":"博茨瓦纳","Central African Republic":"中非共和国","Canada":"加拿大","Switzerland":"瑞士","Chile":"智利","China":"中国","Ivory Coast":"象牙海岸","Cameroon":"喀麦隆","Democratic Republic of the Congo":"刚果民主共和国","Republic of the Congo":"刚果共和国","Colombia":"哥伦比亚","Costa Rica":"哥斯达黎加","Cuba":"古巴","Northern Cyprus":"北塞浦路斯","Cyprus":"塞浦路斯","Czech Republic":"捷克共和国","Germany":"德国","Djibouti":"吉布提","Denmark":"丹麦","Dominican Republic":"多明尼加共和国","Algeria":"阿尔及利亚","Ecuador":"厄瓜多尔","Egypt":"埃及","Eritrea":"厄立特里亚","Spain":"西班牙","Estonia":"爱沙尼亚","Ethiopia":"埃塞俄比亚","Finland":"芬兰","Fiji":"斐","Falkland Islands":"福克兰群岛","France":"法国","Gabon":"加蓬","United Kingdom":"英国","Georgia":"格鲁吉亚","Ghana":"加纳","Guinea":"几内亚","Gambia":"冈比亚","Guinea Bissau":"几内亚比绍","Equatorial Guinea":"赤道几内亚","Greece":"希腊","Greenland":"格陵兰","Guatemala":"危地马拉","French Guiana":"法属圭亚那","Guyana":"圭亚那","Honduras":"洪都拉斯","Croatia":"克罗地亚","Haiti":"海地","Hungary":"匈牙利","Indonesia":"印尼","India":"印度","Ireland":"爱尔兰","Iran":"伊朗","Iraq":"伊拉克","Iceland":"冰岛","Israel":"以色列","Italy":"意大利","Jamaica":"牙买加","Jordan":"约旦","Japan":"日本","Kazakhstan":"哈萨克斯坦","Kenya":"肯尼亚","Kyrgyzstan":"吉尔吉斯斯坦","Cambodia":"柬埔寨","South Korea":"韩国","Kosovo":"科索沃","Kuwait":"科威特","Laos":"老挝","Lebanon":"黎巴嫩","Liberia":"利比里亚","Libya":"利比亚","Sri Lanka":"斯里兰卡","Lesotho":"莱索托","Lithuania":"立陶宛","Luxembourg":"卢森堡","Latvia":"拉脱维亚","Morocco":"摩洛哥","Moldova":"摩尔多瓦","Madagascar":"马达加斯加","Mexico":"墨西哥","Macedonia":"马其顿","Mali":"马里","Myanmar":"缅甸","Montenegro":"黑山","Mongolia":"蒙古","Mozambique":"莫桑比克","Mauritania":"毛里塔尼亚","Malawi":"马拉维","Malaysia":"马来西亚","Namibia":"纳米比亚","New Caledonia":"新喀里多尼亚","Niger":"尼日尔","Nigeria":"尼日利亚","Nicaragua":"尼加拉瓜","Netherlands":"荷兰","Norway":"挪威","Nepal":"尼泊尔","New Zealand":"新西兰","Oman":"阿曼","Pakistan":"巴基斯坦","Panama":"巴拿马","Peru":"秘鲁","Philippines":"菲律宾","Papua New Guinea":"巴布亚新几内亚","Poland":"波兰","Puerto Rico":"波多黎各","North Korea":"北朝鲜","Portugal":"葡萄牙","Paraguay":"巴拉圭","Qatar":"卡塔尔","Romania":"罗马尼亚","Russia":"俄罗斯","Rwanda":"卢旺达","Western Sahara":"西撒哈拉","Saudi Arabia":"沙特阿拉伯","Sudan":"苏丹","South Sudan":"南苏丹","Senegal":"塞内加尔","Solomon Islands":"所罗门群岛","Sierra Leone":"塞拉利昂","El Salvador":"萨尔瓦多","Somaliland":"索马里兰","Somalia":"索马里","Republic of Serbia":"塞尔维亚共和国","Suriname":"苏里南","Slovakia":"斯洛伐克","Slovenia":"斯洛文尼亚","Sweden":"瑞典","Swaziland":"斯威士兰","Syria":"叙利亚","Chad":"乍得","Togo":"多哥","Thailand":"泰国","Tajikistan":"塔吉克斯坦","Turkmenistan":"土库曼斯坦","East Timor":"东帝汶","Trinidad and Tobago":"特里尼达和多巴哥","Tunisia":"突尼斯","Turkey":"土耳其","United Republic of Tanzania":"坦桑尼亚联合共和国","Uganda":"乌干达","Ukraine":"乌克兰","Uruguay":"乌拉圭","United States of America":"美国","Uzbekistan":"乌兹别克斯坦","Venezuela":"委内瑞拉","Vietnam":"越南","Vanuatu":"瓦努阿图","West Bank":"西岸","Yemen":"也门","South Africa":"南非","Zambia":"赞比亚","Zimbabwe":"津巴布韦"}
                }
            ]
        };

    }
);
