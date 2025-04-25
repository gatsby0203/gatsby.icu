---
title: Mathematica Key Generator
date: 2025-04-16T14:55:04+08:00
type: posts
tags:
    - Mathematica
categories:
    - Misc
    - Tools
---

This page provides:

- Wolfram Mathematica 10.0-14.1+ Key Generator
- Wolfram System Modeler 4.0-14.1+ Key Generator
- Wolfram MathLM 10.0-14.0+ Key Generator

<!--more-->

{{< admonition warning >}}

This Keygen is only for evaluation, please purchase the software on the [Official Page][matheatica_pricing].

[matheatica_pricing]:https://www.wolfram.com/mathematica/pricing/

{{< /admonition >}}

{{< admonition tip "How to Use" false >}}

1. On the Mathematica activation window, select “**Activate offline through an activation key and requested password**”.
2. You will see a string labeled `Your MachineID`, which uniquely identifies your device. Click the copy button next to it and paste the value into the keygen.
   {{< image src="images/Mathematica-Activation_1.webp" caption="Mathematica Activation - 1" title="Mathematica Activation - 1">}}
3. In the keygen, enter any valid `Activation Key` in the format:

   ```shell
   nnnn-nnnn-xxxxxx
   ```

   where `n` is a digit and `x` is an uppercase letter or digit.
4. The keygen will generate a corresponding `Password` based on the `MachineID` and `Activation Key`.
5. Copy the generated Password into the Mathematica activation interface and click Activate to complete the process.
   {{< image src="images/Mathematica-Activation_2.webp" caption="Mathematica Activation - 2" title="Mathematica Activation - 2">}}

{{< /admonition >}}

<link rel="stylesheet" href="/mathematica_key_gen/form-style.css">

<form id="keygen-form">
   <fieldset>
      <label for="salt">
      Product <span class="req">*</span>
      </label>
      <select id="salt" required onchange="updateFields()">
         <option value="">Please select the product to activate</option>
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
         <label for="machid">
            MachineID <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>Format is <code>nnnn-nnnnn-nnnnn</code>, which is the unique device identifier, for example <code>1234-56789-01234</code>.</p>
            </div>
         </label>
         <input type="text" id="machid" pattern="\d{4}-\d{5}-\d{5}" required />
         <label for="actkey">
            Activation Key <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>Format is <code>nnnn-nnnn-xxxxxx</code>, where <code>x</code> can be any digit or uppercase letter. The default value is fine if you have no specific requirements.</p>
            </div>
         </label>
         <input type="text" id="actkey" placeholder="" pattern="\d{4}-\d{4}-[0-9A-Z]{6}" required/>
         <label for="lictype">
            License Type <span id="lictype-req" class="req hidden">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>Enter the hexadecimal license type. For versions 14.0 and earlier, leaving this field empty defaults to Professional edition. For Mathematica 14.1 and later versions, this field is required.</p>
               <table>
               <thead>
                  <tr>
                     <th>Value</th>
                     <th>Meaning</th>
                     <th>Usage Scenario</th>
                  </tr>
               </thead>
               <tbody>
                  <tr><td>4</td><td>Student</td><td>Student Edition License</td></tr>
                  <tr><td>10</td><td>Playe</td><td>Wolfram Player License (for version 13 and earlier)</td></tr>
                  <tr><td>20</td><td>Player</td><td>Wolfram Player License (for version 14.1 and later)</td></tr>
                  <tr><td>40</td><td>Player Pro</td><td>Wolfram Player Pro License</td></tr>
                  <tr><td>800</td><td>Home</td><td>Home Edition License</td></tr>
                  <tr><td>1000</td><td>Enterprise</td><td>Enterprise License (for version 13 and earlier, limited functionality)</td></tr>
                  <tr><td>2000</td><td>Enterprise</td><td>Enterprise License (for version 14.1 and later, supports EnterpriseCDF export etc.)</td></tr>
                  <tr><td>80000</td><td>Wolfram Engine</td><td>Wolfram Engine License (free, for non-GUI frontend environments)</td></tr>
                  <tr><td>100000</td><td>Wolfram|Alpha Notebook Edition</td><td>Wolfram|Alpha Notebook Edition License (for version 14.1 and later)</td></tr>
                  <tr><td>200000</td><td>Wolfram|One</td><td>Wolfram|One License (for version 14.1 and later)</td></tr>
                  <tr><td>400000</td><td>Wolfram Finance Platform</td><td>Wolfram Finance Platform License (for version 14.1 and later)</td></tr>
                  <tr><td>800000</td><td>Mathematica</td><td>Mathematica License (for version 14.1 and later)</td></tr>
               </tbody>
               </table>
               <p>These values can be combined by addition. For example, <code>800000 + 2000 + 1000 = 803000</code> represents a Mathematica license with Enterprise functionality.</p>
            </div>
         </label>
         <input type="text" id="lictype" placeholder=""/>
         <label for="licclass" id="licclass-lbl" class="hidden">
            License Class <span class="req">*</span>
            <button class="info-btn" onclick="toggleTip(this)"><span class="info-char">?</span></button>
            <div class="tooltip-box hidden">
               <p>Only fill in when <strong>MathLM</strong> is selected, used to specify client type. One Activation Key can assign one license for each category (A, X, B, C, M) without conflicts</p>
               <thead>
               <tr>
                  <th>Category</th>
                  <th>Meaning</th>
                  <th>Usage Scenario</th>
                  <th>Supported Client Level</th>
               </tr>
            </thead>
            <tbody>
               <tr><td>CA</td><td>Class A</td><td>Desktop System License (Windows/macOS/Linux)</td><td>A</td></tr>
               <tr><td>CX</td><td>Class X</td><td>Extended Desktop License</td><td>A, X</td></tr>
               <tr><td>CB</td><td>Class B</td><td>Server System License</td><td>A, X, B</td></tr>
               <tr><td>CC</td><td>Class C</td><td>Universal License, usable for all Mathematica clients</td><td>A, X, B, C</td></tr>
               <tr><td>CM</td><td>Class M</td><td>System Modeler License</td><td>System Modeler Exclusive License</td></tr>
            </tbody>
            </table>
               <p>For most <strong>MathLM</strong> application scenarios, only the following two <code>License Class</code> configurations are needed:</p>
               <ul>
               <li>
                  <strong>Class C</strong>: Applicable to all <strong>Mathematica clients</strong><br>
                  <span style="color: gray;">(Such as MathKernel, Mathematica frontend, parallel subkernels, etc.)</span>
               </li>
               <li>
                  <strong>Class M</strong>: Applicable to all <strong>System Modeler clients</strong><br>
                  <span style="color: gray;">(Such as Modeling Center, Simulation Center, Session Manager, etc.)</span>
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

> **Note:** If unsuccessful on the first try, you can generate multiple times. When entering the "Activation Key" and "Password", make sure there are no extra spaces.