---
title: Mathematica Key Generator
date: 2023-07-01T19:29:04+08:00
type: posts
tags: 
    - Mathematica
categories: 
    - Misc
    - Tools
---

This page provides:

- Wolfram Mathematica 11 Key Generator
- Wolfram Mathematica 12 Key Generator
- Wolfram Mathematica 13 Key Generator
- Wolfram Mathematica 14 Key Generator
- Wolfram System Modeler 12 Key Generator
- Wolfram System Modeler 13 Key Generator

<!--more-->

{{< admonition warning >}}

This Keygen is only for evaluation, please purchase the software on the [Official Page][matheatica_pricing].

[matheatica_pricing]:https://www.wolfram.com/mathematica/pricing/

{{< /admonition >}}

<div class="form-inline">
<p style="margin-bottom: 0;">Select product:</p>
<input type="radio" id="product-mma12" name="product" value="mma12">
<label for="product-mma12">Mathematica 11/12</label><br>
<input type="radio" id="product-mma13" name="product" value="mma13" checked>
<label for="product-mma13">Mathematica 13/14</label><br>
<input type="radio" id="product-sm" name="product" value="sm12">
<label for="product-sm">System Modeler 12/13</label>
</div>

Enter your MathID below and press **Generate**.

<input type="text" id="mathId" placeholder="XXXX-XXXXX-XXXXX"/>

<button id="generate" class="btn btn--primary">Generate</button>

<p id="result"></p>

> **NOTE:** Try regenerate if it was failed to activate, and do not include extra spaces when filling in the "Activation Key" and "Password".

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

{{< admonition tip "How to Use" false >}}

On Mathematica Activation page, select "Manually Activation", use the MathID to generate "Activation Key" and "Password"。

{{< image src="images/Mathematica-Activation_1.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}
{{< image src="images/Mathematica-Activation_2.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}

{{< /admonition >}}