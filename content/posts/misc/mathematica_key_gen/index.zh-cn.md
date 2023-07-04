---
title: Mathematica 注册机
date: 2023-07-01T19:29:04+08:00
type: posts
tags: 
    - Mathematica
categories: 
    - Misc
    - Tools
---

此页面提供:

- Wolfram Mathematica 11 注册机
- Wolfram Mathematica 12 注册机
- Wolfram Mathematica 13 注册机
- Wolfram System Modeler 12 注册机
- Wolfram System Modeler 13 注册机

<!--more-->

{{< admonition warning >}}

注册机仅供评估使用，请到 [Wolfram 官方][matheatica_pricing] 购买正版软件。

[matheatica_pricing]:https://www.wolfram.com/mathematica/pricing/

{{< /admonition >}}

<div class="form-inline">
    <p style="margin-bottom: 0;">软件版本：</p>
    <input type="radio" id="product-mma12" name="product" value="mma12">
    <label for="product-mma12">Mathematica 11/12</label><br>
    <input type="radio" id="product-mma13" name="product" value="mma13" checked>
    <label for="product-mma13">Mathematica 13</label><br>
    <input type="radio" id="product-sm" name="product" value="sm12">
    <label for="product-sm">System Modeler 12/13</label>
</div>

在下面输入 MathID 并点击 **生成**.

<input type="text" id="mathId" placeholder="XXXX-XXXXX-XXXXX"/>

<button id="generate" class="btn btn--primary">生成</button>

<p id="result"></p>

> **注：** 一次不成功可以尝试多生成几次，填写 “Activation Key” 和 “Password” 时不能包含多余的空格。

<script type="text/javascript">

const testSalt = (a, b, c) => {
    for (let i = 0; i < 8; i += 1) {
        const t = (b >> i) & 1
        if (t + ((a - t) & ~1) === a) {
            a = (a - t) >> 1
        } else {
            a = ((c - t) ^ a) >> 1
        }
    }

    return a
}

const genPassword = (string, salt) => {
    const uuid = string.split('').map(x => x.charCodeAt())

    let salt1 = salt
    for (let i = uuid.length - 1; i >= 0; i -= 1) {
        salt1 = testSalt(salt1, uuid[i], 0x105C3)
    }

    let offset1 = 0
    while (testSalt(testSalt(salt1, offset1 & 0xFF, 0x105C3), offset1 >> 8, 0x105C3) !== 0xA5B6) {
        offset1 += 1
        if (offset1 >= 0xFFFF) {
            return 'Error'
        }
    }

    offset1 = parseInt(((offset1 + 0x72FA) & 0xFFFF) * 99999 / 0xFFFF, 10)
    offset1 = `0000${offset1}`.substr(-5)

    let salt2 = `${offset1.substr(0, 2)}${offset1.substr(3, 2)}${offset1.substr(2, 1)}`
    salt2 = parseInt(salt2, 10)
    salt2 = parseInt((salt2 / 99999.0) * 0xFFFF, 10) + 1
    salt2 = testSalt(testSalt(0, salt2 & 0xFF, 0x1064B), salt2 >> 8, 0x1064B)
    for (let i = uuid.length - 1; i >= 0; i -= 1) {
        salt2 = testSalt(salt2, uuid[i], 0x1064B)
    }

    let offset2 = 0
    while (testSalt(testSalt(salt2, offset2 & 0xFF, 0x1064B), offset2 >> 8, 0x1064B) !== 0xA5B6) {
        offset2 += 1
        if (offset2 >= 0xFFFF) {
            return 'Error'
        }
    }

    offset2 = parseInt((offset2 & 0xFFFF) * 99999 / 0xFFFF, 10)
    offset2 = `0000${offset2}`.substr(-5)

    const password = [
        offset2[3],
        offset1[3],
        offset1[1],
        offset1[0],
        '-',
        offset2[4],
        offset1[2],
        offset2[0],
        '-',
        offset2[2],
        offset1[4],
        offset2[1],
        '::1'
    ]

    return password.join('')
}

function checkMathId(s) {
    const re = new RegExp("^[0-9]{4}-[0-9]{5}-[0-9]{5}");
    return re.test(s);
}

function genActivationKey() {
    s = "";
    for (let i = 0; i < 14; i++) {
        s += Math.floor(Math.random() * 10);
        if (i === 3 || i === 7)
            s += "-";
    }
    return s;
}

document.getElementById("generate").addEventListener("click", function () {
    var mathId = document.getElementById("mathId").value.trim();
    if (!checkMathId(mathId)) {
        document.getElementById("result").innerText = "Bad MathID!";
    } else {
        var activationKey = genActivationKey();
        var magicNumbers;
        var software = document.querySelector("input[name=product]:checked").value;
        if (software === "mma12" || software === "mma13") {
            magicNumbers = [10690, 12251, 17649, 24816, 33360, 35944, 36412, 42041, 42635, 44011, 53799, 56181, 58536, 59222, 61041];
        } else if (software === "sm12") {
            magicNumbers = [4912, 4961, 22384, 24968, 30046, 31889, 42446, 43787, 48967, 61182, 62774];
        } else {
            document.getElementById("result").innerHTML = `<p>Unknown software suite: ${software}.</p>`;
            return;
        }
        var magicNumber = magicNumbers[Math.floor(Math.random() * magicNumbers.length)]
        var password = genPassword(mathId + "$1&" + activationKey, magicNumber);
        document.getElementById("result").innerHTML = `
        <p>
        <b>Activation Key</b>: ${activationKey}
        <br>
        <b>Password</b>: ${password}
        </p>
        `;
    }
});
</script>

{{< admonition tip "使用方法" false >}}

在 Mathematica 激活页面选择“Manually Activation”手动激活，复制 MathID 并填入注册机生成对应的 “Activation Key” 和 “Password” 即可。

{{< image src="images/Mathematica-Activation_1.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}
{{< image src="images/Mathematica-Activation_2.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}

{{< /admonition >}}