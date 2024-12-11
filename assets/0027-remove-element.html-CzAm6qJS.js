import{_ as n}from"./plugin-vue_export-helper-DlAUqK2U.js";import{c as s,e as a,o as i}from"./app-51Hm5EGh.js";const t={};function l(o,e){return i(),s("div",null,e[0]||(e[0]=[a(`<h1 id="「力扣」第-27-题-移除元素-简单" tabindex="-1"><a class="header-anchor" href="#「力扣」第-27-题-移除元素-简单"><span>「力扣」第 27 题：移除元素（简单）</span></a></h1><ul><li>题目链接：https://leetcode.cn/problems/remove-element/description/</li></ul><p>给你一个数组 <code>nums</code> 和一个值 <code>val</code>，你需要 <strong><a href="https://baike.baidu.com/item/%E5%8E%9F%E5%9C%B0%E7%AE%97%E6%B3%95" target="_blank" rel="noopener noreferrer">原地</a></strong> 移除所有数值等于 <code>val</code> 的元素。元素的顺序可能发生改变。然后返回 <code>nums</code> 中与 <code>val</code> 不同的元素的数量。</p><p>假设 <code>nums</code> 中不等于 <code>val</code> 的元素数量为 <code>k</code>，要通过此题，您需要执行以下操作：</p><ul><li>更改 <code>nums</code> 数组，使 <code>nums</code> 的前 <code>k</code> 个元素包含不等于 <code>val</code> 的元素。<code>nums</code> 的其余元素和 <code>nums</code> 的大小并不重要。</li><li>返回 <code>k</code>。</li></ul><p><strong>用户评测：</strong></p><p>评测机将使用以下代码测试您的解决方案：</p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>int[] nums = [...]; // 输入数组</span></span>
<span class="line"><span>int val = ...; // 要移除的值</span></span>
<span class="line"><span>int[] expectedNums = [...]; // 长度正确的预期答案。</span></span>
<span class="line"><span>                            // 它以不等于 val 的值排序。</span></span>
<span class="line"><span></span></span>
<span class="line"><span>int k = removeElement(nums, val); // 调用你的实现</span></span>
<span class="line"><span></span></span>
<span class="line"><span>assert k == expectedNums.length;</span></span>
<span class="line"><span>sort(nums, 0, k); // 排序 nums 的前 k 个元素</span></span>
<span class="line"><span>for (int i = 0; i &lt; actualLength; i++) {</span></span>
<span class="line"><span>    assert nums[i] == expectedNums[i];</span></span>
<span class="line"><span>}</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>如果所有的断言都通过，你的解决方案将会 <strong>通过</strong>。</p><p><strong>示例 1：</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [3,2,2,3], val = 3</span></span>
<span class="line"><span>输出：2, nums = [2,2,_,_]</span></span>
<span class="line"><span>解释：你的函数函数应该返回 k = 2, 并且 nums 中的前两个元素均为 2。</span></span>
<span class="line"><span>你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>示例 2：</strong></p><div class="language- line-numbers-mode" data-highlighter="shiki" data-ext="" data-title="" style="--shiki-light:#383A42;--shiki-dark:#abb2bf;--shiki-light-bg:#FAFAFA;--shiki-dark-bg:#282c34;"><pre class="shiki shiki-themes one-light one-dark-pro vp-code"><code><span class="line"><span>输入：nums = [0,1,2,2,3,0,4,2], val = 2</span></span>
<span class="line"><span>输出：5, nums = [0,1,4,0,3,_,_,_]</span></span>
<span class="line"><span>解释：你的函数应该返回 k = 5，并且 nums 中的前五个元素为 0,0,1,3,4。</span></span>
<span class="line"><span>注意这五个元素可以任意顺序返回。</span></span>
<span class="line"><span>你在返回的 k 个元素之外留下了什么并不重要（因此它们并不计入评测）。</span></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><strong>提示：</strong></p><ul><li><code>0 &lt;= nums.length &lt;= 100</code></li><li><code>0 &lt;= nums[i] &lt;= 50</code></li><li><code>0 &lt;= val &lt;= 100</code></li></ul>`,15)]))}const d=n(t,[["render",l],["__file","0027-remove-element.html.vue"]]),c=JSON.parse('{"path":"/leetcode/loop-invariant/0027-remove-element.html","title":"「力扣」第 27 题：移动元素","lang":"zh-CN","frontmatter":{"title":"「力扣」第 27 题：移动元素","date":"2017-06-03T08:00:00.000Z","isOriginal":true,"author":"liweiwei1419","category":"循环不变量","tag":["数组","循环不变量"],"description":"「力扣」第 27 题：移除元素（简单） 题目链接：https://leetcode.cn/problems/remove-element/description/ 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。 假设 nums 中不等...","head":[["meta",{"property":"og:url","content":"https://vuepress-theme-hope-docs-demo.netlify.app/leetcode-solutions/leetcode/loop-invariant/0027-remove-element.html"}],["meta",{"property":"og:site_name","content":"「力扣」题解"}],["meta",{"property":"og:title","content":"「力扣」第 27 题：移动元素"}],["meta",{"property":"og:description","content":"「力扣」第 27 题：移除元素（简单） 题目链接：https://leetcode.cn/problems/remove-element/description/ 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素。元素的顺序可能发生改变。然后返回 nums 中与 val 不同的元素的数量。 假设 nums 中不等..."}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2024-11-30T17:15:45.000Z"}],["meta",{"property":"article:author","content":"liweiwei1419"}],["meta",{"property":"article:tag","content":"数组"}],["meta",{"property":"article:tag","content":"循环不变量"}],["meta",{"property":"article:published_time","content":"2017-06-03T08:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2024-11-30T17:15:45.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"「力扣」第 27 题：移动元素\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2017-06-03T08:00:00.000Z\\",\\"dateModified\\":\\"2024-11-30T17:15:45.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"liweiwei1419\\"}]}"]]},"headers":[],"git":{"createdTime":1732986945000,"updatedTime":1732986945000,"contributors":[{"name":"liweiwei1419","email":"liweiwei1419@gmail.com","commits":1}]},"readingTime":{"minutes":1.66,"words":498},"filePathRelative":"leetcode/loop-invariant/0027-remove-element.md","localizedDate":"2017年6月3日","autoDesc":true}');export{d as comp,c as data};