import { useIntersectionObserver } from '@vueuse/core'

/**
 * 自定義指令：點擊外部觸發
 * 使用方式：v-click-outside="handler"
 */
const clickOutside = {
  mounted(el, binding) {
    el.__clickOutsideHandler__ = (event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value(event)
      }
    }
    document.addEventListener('click', el.__clickOutsideHandler__)
  },
  unmounted(el) {
    document.removeEventListener('click', el.__clickOutsideHandler__)
  },
}

/**
 * 自定義指令：元素進入可視區域時執行回調（圖片懶加載）
 * 使用方式：v-lazy="imageUrl"
 */
const lazy = {
  mounted(el, binding) {
    const { stop } = useIntersectionObserver(
      el,
      ([{ isIntersecting }]) => {
        if (isIntersecting) {
          // 圖片進入可視區域時加載圖片
          el.src = binding.value
          // 停止觀察
          stop()
        }
      },
      {
        // 當元素進入可視區域時觸發
        rootMargin: '0px',
        threshold: 0.1,
      }
    )
  },
  // 圖片地址更新時重新加載
  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      el.src = binding.value
    }
  },
}

/**
 * 自定義指令：複製文本
 * 使用方式：v-copy="'要複製的文本'"
 */
const copy = {
  mounted(el, binding) {
    el.style.cursor = 'pointer'
    el.title = '點擊複製'
    
    el.__copyHandler__ = async () => {
      try {
        await navigator.clipboard.writeText(binding.value)
        // 可以添加提示
        console.log('複製成功')
      } catch (err) {
        console.error('複製失敗:', err)
      }
    }
    
    el.addEventListener('click', el.__copyHandler__)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__copyHandler__)
  },
  updated(el, binding) {
    // 更新綁定的值
    el.__copyHandler__ = async () => {
      try {
        await navigator.clipboard.writeText(binding.value)
        console.log('複製成功')
      } catch (err) {
        console.error('複製失敗:', err)
      }
    }
  },
}

/**
 * 自定義指令：按鈕防抖
 * 使用方式：v-debounce="[function, 延遲時間(ms)]"
 */
const debounce = {
  mounted(el, binding) {
    const [fn, delay = 300] = binding.value
    let timer = null
    
    el.__debounceHandler__ = function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
        fn.apply(this, args)
      }, delay)
    }
    
    el.addEventListener('click', el.__debounceHandler__)
  },
  unmounted(el) {
    el.removeEventListener('click', el.__debounceHandler__)
  },
}

/**
 * 自定義指令：權限控制
 * 使用方式：v-permission="'add" 或 v-permission="['add', 'edit']"
 */
const permission = {
  mounted(el, binding) {
    const { value } = binding
    const permissions = ['add', 'edit', 'delete'] // 假設這是用戶擁有的權限列表
    
    if (value && value instanceof Array && value.length > 0) {
      const hasPermission = permissions.some(permission => value.includes(permission))
      
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error('v-permission 需要一個權限數組，例如 v-permission="[\'add\',\'edit\']"')
    }
  },
}

/**
 * 自定義指令：拖拽
 * 使用方式：v-draggable
 */
const draggable = {
  mounted(el) {
    el.style.cursor = 'move'
    el.style.position = 'absolute'
    
    el.onmousedown = function(e) {
      // 計算鼠標位置與元素邊界的距離
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop
      
      document.onmousemove = function(e) {
        // 計算元素的新位置
        let left = e.clientX - disX
        let top = e.clientY - disY
        
        // 邊界檢查（可選）
        const maxLeft = document.documentElement.clientWidth - el.offsetWidth
        const maxTop = document.documentElement.clientHeight - el.offsetHeight
        
        left = Math.max(0, Math.min(left, maxLeft))
        top = Math.max(0, Math.min(top, maxTop))
        
        // 設置新位置
        el.style.left = left + 'px'
        el.style.top = top + 'px'
      }
      
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
      
      // 阻止默認行為（避免選中文本）
      return false
    }
  },
  unmounted(el) {
    el.onmousedown = null
  },
}

// 導出自定義指令
export default {
  install(app) {
    app.directive('click-outside', clickOutside)
    app.directive('lazy', lazy)
    app.directive('copy', copy)
    app.directive('debounce', debounce)
    app.directive('permission', permission)
    app.directive('draggable', draggable)
  },
}
