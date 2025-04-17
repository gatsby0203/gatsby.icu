---
title: Mathematica 注册机
date: 2025-04-16T14:55:04+08:00
type: posts
tags:
    - Mathematica
categories:
    - Misc
    - Tools
---

此页面提供:

- Mathematica 10.0-14.1+ 注册机
- System Modeler 4.0-14.1+ 注册机
- MathLM 10.0-14.0+ 注册机

<!--more-->

{{< admonition warning >}}

注册机仅供评估使用，请到 [Wolfram 官方][matheatica_pricing] 购买正版软件。

[matheatica_pricing]:https://www.wolfram.com/mathematica/pricing/

{{< /admonition >}}

{{< admonition tip "使用方法" false >}}

在 Mathematica 激活页面选择“Manually Activation”手动激活，复制 MathID 并填入注册机生成对应的 “Activation Key” 和 “Password” 即可。

{{< image src="images/Mathematica-Activation_1.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}
{{< image src="images/Mathematica-Activation_2.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}

{{< /admonition >}}

<link rel="stylesheet" href="/mathematica_key_gen/form-style.css">

<form id="keygen-form">
   <fieldset>
      <label for="salt">
      产品类型 <span class="req">*</span>
      </label>
      <select id="salt" required onchange="updateFields()">
         <option value="">请选择需要激活的软件</option>
         <option value="mathematica:14.1+" data-type="mathematica" data-ver="14.1+">Mathematica 14.1+</option>
         <option value="mathematica:13.0-14.1" data-type="mathematica" data-ver="13.0-14.1">Mathematica 13.0-14.1</option>
         <option value="mathematica:12.0-13.0+" data-type="mathematica" data-ver="12.0-13.0+">Mathematica 12.0-13.0+</option>
         <option value="mathematica:10.2-12.0" data-type="mathematica" data-ver="10.2-12.0">Mathematica 10.2-12.0</option>
         <option value="mathematica:10.0-10.2" data-type="mathematica" data-ver="10.0-10.2">Mathematica 10.0-10.2</option>
         <option value="system-modeler:14.1+" data-type="system-modeler" data-ver="14.1+">System Modeler 14.1+</option>
         <option value="system-modeler:13.0-14.1" data-type="system-modeler" data-ver="13.0-14.1">System Modeler 13.0-14.1</option>
         <option value="system-modeler:5.0-13.0" data-type="system-modeler" data-ver="5.0-13.0">System Modeler 5.0-13.0</option>
         <option value="system-modeler:4.0-5.0" data-type="system-modeler" data-ver="4.0-5.0">System Modeler 4.0-5.0</option>
         <option value="mathlm:10.0-14.0+" data-type="mathlm" data-ver="10.0-14.0+">MathLM 10.0-14.0+</option>
      </select>
      <div id="fields" class="hidden">
         <label for="mathid">
            MathID <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>格式为 <code>nnnn-nnnnn-nnnnn</code>，是设备唯一识别码，例如 <code>1234-56789-01234</code>。</p>
            </div>
         </label>
         <input type="text" id="mathid" pattern="\d{4}-\d{5}-\d{5}" required />
         <label for="actkey">
            Activation Key <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>格式为 <code>nnnn-nnnn-xxxxxx</code>，<code>x</code> 为数字或大写字母，无特别需求使用默认即可。</p>
            </div>
         </label>
         <input type="text" id="actkey" placeholder="" pattern="\d{4}-\d{4}-[0-9A-Z]{6}" required/>
         <label for="lictype">
            许可类型 <span id="lictype-req" class="req hidden">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>填写 16 进制许可类型，在 14.0 及以前的版本中不指定该字段默认为 Professional 版本。在 Mathematica 14.1 及以后的版本中为必填。</p>
               <table>
               <thead>
                  <tr>
                     <th>数值</th>
                     <th>含义</th>
                     <th>使用情境</th>
                  </tr>
               </thead>
               <tbody>
                  <tr><td>4</td><td>Student</td><td>学生版授权</td></tr>
                  <tr><td>10</td><td>Playe</td><td>Wolfram Player 授权（用于 13 及以前的版本）</td></tr>
                  <tr><td>20</td><td>Player</td><td>Wolfram Player 授权（用于 14.1 及以后版本）</td></tr>
                  <tr><td>40</td><td>Player Pro</td><td>Wolfram Player Pro 授权</td></tr>
                  <tr><td>800</td><td>Home</td><td>家庭版授权</td></tr>
                  <tr><td>1000</td><td>Enterprise</td><td>企业版授权（用于 13 及以前版本，但功能不全）</td></tr>
                  <tr><td>2000</td><td>Enterprise</td><td>企业版授权（用于 14.1 及以后版本，支持 EnterpriseCDF 导出等功能）</td></tr>
                  <tr><td>80000</td><td>Wolfram Engine</td><td>Wolfram Engine 授权（本身免费，用于无 GUI 前端环境）</td></tr>
                  <tr><td>100000</td><td>Wolfram|Alpha Notebook Edition</td><td>Wolfram|Alpha Notebook Edition 授权（用于 14.1 及以后版本）</td></tr>
                  <tr><td>200000</td><td>Wolfram|One</td><td>Wolfram|One授权（用于 14.1 及以后版本）</td></tr>
                  <tr><td>400000</td><td>Wolfram Finance Platform</td><td>Wolfram Finance Platform 授权（用于 14.1 及以后版本）</td></tr>
                  <tr><td>800000</td><td>Mathematica</td><td>Mathematica 授权（用于 14.1 及以后版本）</td></tr>
               </tbody>
               </table>
               <p>这些数值可组合相加，例如 <code>800000 + 2000 + 1000 = 803000</code>表示一个带 Enterprise 功能的 Mathematica 授权。</p>
            </div>
         </label>
         <input type="text" id="lictype" placeholder=""/>
         <label for="licclass" id="licclass-lbl" class="hidden">
            许可等级 <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>仅当选择 <strong>MathLM</strong> 时填写，用于指定客户端类型，一个 Activation Key 可以为每个类别（A、X、B、C、M）分别指定一个许可互不冲突</p>
               <thead>
               <tr>
                  <th>类别</th>
                  <th>含义</th>
                  <th>使用场景</th>
                  <th>支持客户端级别</th>
               </tr>
            </thead>
            <tbody>
               <tr><td>CA</td><td>Class A</td><td>桌面系统许可（Windows/macOS/Linux）</td><td>A</td></tr>
               <tr><td>CX</td><td>Class X</td><td>扩展桌面许可</td><td>A, X</td></tr>
               <tr><td>CB</td><td>Class B</td><td>服务器系统许可</td><td>A, X, B</td></tr>
               <tr><td>CC</td><td>Class C</td><td>通用许可，可用于所有 Mathematica 客户端</td><td>A, X, B, C</td></tr>
               <tr><td>CM</td><td>Class M</td><td>System Modeler 许可</td><td>System Modeler 专用许可</td></tr>
            </tbody>
            </table>
               <p>对于大多数 <strong>MathLM</strong> 应用场景，只需配置以下两种 <code>License Class</code>：</p>
               <ul>
               <li>
                  <strong>Class C</strong>：适用于所有 <strong>Mathematica 客户端</strong><br>
                  <span style="color: gray;">（如 MathKernel、Mathematica 前端、并行子内核等）</span>
               </li>
               <li>
                  <strong>Class M</strong>：适用于所有 <strong>System Modeler 客户端</strong><br>
                  <span style="color: gray;">（如 Modeling Center、Simulation Center、Session Manager 等）</span>
               </li>
               </ul>
            </div>
         </label>
         <input type="text" id="licclass" class="hidden" placeholder=""/>
         <button id="submit-btn" type="submit">生成 Password</button>
      </div>
   </fieldset>
</form>
<fieldset id="output-fieldset" class="hidden">
  <legend>Password</legend>
  <pre><code id="output-passwd"></code></pre>
</fieldset>
</form>

<script src="/mathematica_key_gen/wolfram-keygen.js"></script>

> **注：** 一次不成功可以尝试多生成几次，填写 "Activation Key" 和 "Password" 时不能包含多余的空格。