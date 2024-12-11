import{_ as k}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as e,a as i,f as r,g as a,r as d,o as p,b as s}from"./app-51Hm5EGh.js";const A={};function B(y,l){const h=d("Tabs");return p(),e("div",null,[l[4]||(l[4]=i("p",null,"Java 代码：",-1)),r(h,{id:"3",data:[{id:"第 1 版 partition 代码"},{id:"第 2 版 partition 代码"}]},{title0:a(({value:t,isActive:n})=>l[0]||(l[0]=[s("第 1 版 partition 代码")])),title1:a(({value:t,isActive:n})=>l[1]||(l[1]=[s("第 2 版 partition 代码")])),tab0:a(({value:t,isActive:n})=>l[2]||(l[2]=[i("div",{class:"language-java line-numbers-mode","data-highlighter":"shiki","data-ext":"java","data-title":"java",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"class"),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#E5C07B"}}," Solution"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"    public"),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}}," int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#61AFEF"}},"[] "),i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"sortArrayByParity"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"[] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}},"nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},")"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," len"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E5C07B"}}," nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E5C07B"}},"length"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"        // nums[0..j] 偶数")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"        // nums(j..i) 奇数")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," j"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," -"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"1"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        for"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," ("),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," i"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 0"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"; i "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"<"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," len; i++) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"            if"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," ((nums[i] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"%"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 2"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"=="),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 0"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," ) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"                j++;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"                swap"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"(nums, i, j);")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        return"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"    private"),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}}," void"),i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}}," swap"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"[] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}},"nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},", "),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}}," index1"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},", "),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}}," index2"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},")"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," temp"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums[index1];")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        nums[index1] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums[index2];")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        nums[index2] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," temp;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"}")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1)])),tab1:a(({value:t,isActive:n})=>l[3]||(l[3]=[i("div",{class:"language-java line-numbers-mode","data-highlighter":"shiki","data-ext":"java","data-title":"java",style:{"--shiki-light":"#383A42","--shiki-dark":"#abb2bf","--shiki-light-bg":"#FAFAFA","--shiki-dark-bg":"#282c34"}},[i("pre",{class:"shiki shiki-themes one-light one-dark-pro vp-code"},[i("code",null,[i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"class"),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#E5C07B"}}," Solution"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"    public"),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}}," int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#61AFEF"}},"[] "),i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"sortArrayByParity"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"[] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}},"nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},")"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," len"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E5C07B"}}," nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"."),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E5C07B"}},"length"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        ")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"        // nums[0..even) 偶数")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A0A1A7","--shiki-light-font-style":"italic","--shiki-dark":"#7F848E","--shiki-dark-font-style":"italic"}},"        // nums(odd..right] 奇数")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," even"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 0"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," odd"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," len "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"-"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 1"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        while"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," ("),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}},"true"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"            while"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (even "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"<="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," odd "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"&&"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (nums[even] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"%"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 2"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"=="),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 0"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"                even++;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"            while"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (even "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"<="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," odd "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"&&"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (nums[odd] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"%"),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 2"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"=="),i("span",{style:{"--shiki-light":"#986801","--shiki-dark":"#D19A66"}}," 1"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},") {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"                odd--;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"            if"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," (even "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},">="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," odd) {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"                break"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},";")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}},"            swap"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"(nums, even, odd);")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            even++;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"            odd--;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        return"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    }")]),s(`
`),i("span",{class:"line"}),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"    private"),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}}," void"),i("span",{style:{"--shiki-light":"#4078F2","--shiki-dark":"#61AFEF"}}," swap"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"("),i("span",{style:{"--shiki-light":"#C18401","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"[] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}},"nums"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},", "),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}}," index1"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},", "),i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"int"),i("span",{style:{"--shiki-light":"#383A42","--shiki-light-font-style":"inherit","--shiki-dark":"#E06C75","--shiki-dark-font-style":"italic"}}," index2"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},")"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," {")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#A626A4","--shiki-dark":"#C678DD"}},"        int"),i("span",{style:{"--shiki-light":"#E45649","--shiki-dark":"#E06C75"}}," temp"),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}}," ="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums[index1];")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        nums[index1] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," nums[index2];")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"        nums[index2] "),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#56B6C2"}},"="),i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}}," temp;")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"    }")]),s(`
`),i("span",{class:"line"},[i("span",{style:{"--shiki-light":"#383A42","--shiki-dark":"#ABB2BF"}},"}")])])]),i("div",{class:"line-numbers","aria-hidden":"true",style:{"counter-reset":"line-number 0"}},[i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"}),i("div",{class:"line-number"})])],-1)])),_:1})])}const o=k(A,[["render",B],["__file","0905-sort-array-by-parity.html.vue"]]),m=JSON.parse('{"path":"/leetcode/quick-sort/0905-sort-array-by-parity.html","title":"「力扣」第 905 题：按奇偶排序数组（简单）","lang":"zh-CN","frontmatter":{"title":"「力扣」第 905 题：按奇偶排序数组（简单）","icon":"laptop-code","description":"Java 代码：","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/leetcode-solutions/leetcode/quick-sort/0905-sort-array-by-parity.html"}],["meta",{"property":"og:site_name","content":"「力扣」题解"}],["meta",{"property":"og:title","content":"「力扣」第 905 题：按奇偶排序数组（简单）"}],["meta",{"property":"og:description","content":"Java 代码："}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-12-11T19:30:07.000Z"}],["meta",{"property":"article:modified_time","content":"2024-12-11T19:30:07.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"「力扣」第 905 题：按奇偶排序数组（简单）\\",\\"image\\":[\\"\\"],\\"dateModified\\":\\"2024-12-11T19:30:07.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"Mr.Hope\\",\\"url\\":\\"https://mister-hope.com\\"}]}"]]},"headers":[],"git":{"createdTime":1733945174000,"updatedTime":1733945407000,"contributors":[{"name":"liweiwei1419","email":"liweiwei1419@gmail.com","commits":2}]},"readingTime":{"minutes":0.59,"words":177},"filePathRelative":"leetcode/quick-sort/0905-sort-array-by-parity.md","localizedDate":"2024年12月11日","autoDesc":true}');export{o as comp,m as data};