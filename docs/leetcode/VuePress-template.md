# 文档 VuePress 的主题 Hope 功能测试

## 图片

![测试图片说明](https://picture-bed.dance8.fun/crazy-algo/2024-10-05/d864af50-bccf-43be-a9a8-deef9c03a157.png)


## 音频播放器

<VidStack
  src="https://files.vidstack.io/sprite-fight/720p.mp4"
  poster="https://files.vidstack.io/sprite-fight/poster.webp"
/>

<VidStack src="https://minio.dance8.fun/songs/20241014/%E5%A8%81%E6%98%8E%E6%AD%8C-%E6%95%A2%E9%97%AE%E8%B7%AF%E5%9C%A8%E4%BD%95%E6%96%B9%EF%BC%88%E5%8E%9F%E5%94%B1%EF%BC%9A%E8%92%8B%E5%A4%A7%E4%B8%BA%EF%BC%89.mp3" title="威明歌-敢问路在何方（原唱：蒋大为）" />


## 选项卡

::: tabs#code

@tab java

```java{1,3-7}
import java.util.HashMap;
import java.util.Map;

public class Solution {

    public int[] twoSum(int[] nums, int target) {
        int len = nums.length;
        Map<Integer, Integer> hashMap = new HashMap<>(len - 1);
        for (int i = 0; i < len; i++) {
            if (hashMap.containsKey(target - nums[i])) {
                return new int[]{i, hashMap.get(target - nums[i])};
            }
            hashMap.put(nums[i], i);
        }
        return new int[0];
    }
    
}
```

@tab python

```python
class Solution:
    def twoSum(self, nums: List[int], target: int) -> List[int]:
        map = dict()
        for index, num in enumerate(nums):
            if target - num in map:
                return [index, map[target - num]]
            else:
                map[num] = index

```

:::


## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```


## 幻灯片

@slidestart

## 幻灯片标题

一个拥有文字和 [链接](https://mister-hope.com) 的段落

---

## 代码高亮

```js [2-4|1-5]
const add = (a, b) => {
  if (typeof b === "undefined") return a + 1;

  return a + b;
};
```

@slideend