# 上下文
文件名：task_profile_page.md
创建于：[2024-07-28 10:00]
创建者：AI
关联协议：RIPER-5 + Multidimensional + Agent Protocol 

# 任务描述
生成一个美观的个人信息展示页面,要求有退出按钮 user信息{"_creationTime": 1750785060753.1348, "_id": "j574kws589f842vn3d68yrv7a97jetn2", "calories": 1980, "credits": 10, "email": "3214026782@qq.com", "gender": "male", "goal": "lose", "height": "180", "name": "Roydust ", "proteins": 150, "updatedAt": 1750785060756, "weight": "100"}

# 项目概述
这是一个使用 React Native, Expo, Convex, and Firebase 构建的 AI 饮食计划应用。需要为用户个人资料页面创建一个美观的 UI，显示用户信息并提供退出登录功能。

---
*以下部分由 AI 在协议执行过程中维护*
---

# 分析 (由 RESEARCH 模式填充)
- **用户信息**: 通过 `useContext(UserContext)` 在 `Profile.tsx` 中可用。用户对象包含所有需要显示的信息。
- **UI**: 当前的 `Profile.tsx` 是一个占位符。需要构建一个美观的界面来显示用户的详细信息（姓名、电子邮件、性别、身高、体重、目标、卡路里、蛋白质、积分）。
- **登出**:
    - 当前没有现成的登出功能。
    - 认证使用 Firebase (`services/firebase.js`)。
    - 登出功能应使用 `firebase/auth` SDK 中的 `signOut` 函数，并传入从 `services/firebase.js` 导出的 `auth` 对象。
    - `app/index.tsx` 中的 `onAuthStateChanged` 监听器只处理了登录逻辑，当用户登出时 (`userInfo` 为 `null`) 会因空指针异常而崩溃。此 BUG 需要修复。
    - 成功调用 `signOut`后，应用需要将用户导航到登录页面。可以使用 `expo-router` 的 `useRouter` hook 来实现，例如 `router.replace('/auth/SignIn')`。

# 提议的解决方案 (由 INNOVATE 模式填充)
- **UI 设计**:
    - **布局**: 采用基于卡片的现代化布局，清晰地分隔个人信息、身体数据和饮食目标。
    - **头像**: 由于缺少用户图片，将使用基于用户姓名首字母生成的占位符头像，以增加个性化。
    - **图标**: 为每个信息项（如身高、体重）配备 `Ionicons` 图标，提升视觉吸引力和可读性。
    - **颜色与样式**: 遵循 `shared/Colors.tsx` 中定义的现有颜色方案，确保与应用的整体风格保持一致。
- **登出流程**:
    - **按钮实现**: 在个人资料页面添加一个明显的“登出”按钮。
    - **核心逻辑**: 点击按钮后，调用 Firebase 的 `signOut(auth)` 方法。
    - **重定向**: 推荐采用更稳健的方案：修改 `app/index.tsx` 中的 `onAuthStateChanged` 监听器。当检测到 `userInfo` 为 `null` 时（即用户已登出），自动将用户重定向到登录页面 (`/auth/SignIn`)。这种集中式处理确保了无论在何处触发登出，应用都能正确响应。

# 实施计划 (由 PLAN 模式生成)
实施检查清单：
1.  **文件: `app/index.tsx`**
    *   **任务:** 修改 `onAuthStateChanged` 以正确处理用户登录和登出状态。
    *   **详情:**
        *   在 `onAuthStateChanged` 回调中，增加对 `userInfo` 是否存在的判断。
        *   如果 `userInfo` 存在（用户已登录），则执行现有逻辑：从 Convex 获取用户数据，调用 `setUser`，然后使用 `router.push('/(tabs)/Home')` 跳转到主页。
        *   如果 `userInfo` 为 `null`（用户已登出），则调用 `setUser(null)` 清除用户状态，并使用 `router.replace('/')` 将用户导航回应用的初始启动页。

2.  **文件: `app/(tabs)/Profile.tsx`**
    *   **任务:** 彻底重新设计个人资料页面的 UI，使其美观且信息丰富。
    *   **详情:**
        *   替换所有占位符内容，引入 `Image`, `TouchableOpacity`, `Ionicons` 等组件。
        *   当从 `UserContext` 获取的 `user` 为空时，显示加载指示器。
        *   根据用户姓名首字母创建一个风格化的圆形头像。
        *   在头像下方清晰地展示用户的姓名和邮箱。
        *   使用卡片式布局分块展示以下信息，并为每项配上 `Ionicons` 图标：
            *   个人信息：性别
            *   身体数据：身高、体重
            *   饮食目标：目标、每日卡路里、每日蛋白质
            *   账户信息：剩余积分
        *   确保整个页面的样式（颜色、字体、间距）与应用整体设计保持一致。

3.  **文件: `app/(tabs)/Profile.tsx`**
    *   **任务:** 实现用户的登出功能。
    *   **详情:**
        *   在页面底部添加一个明确的“登出”按钮。
        *   创建一个名为 `handleLogout` 的 `async` 函数。
        *   在此函数中，使用 `try-catch` 结构调用 `signOut(auth)`。
        *   为了提供即时反馈和流畅的用户体验，在 `signOut` 成功后立即调用 `router.replace('/')`。`onAuthStateChanged` 监听器将作为后续保障。
        *   在控制台记录任何可能发生的错误。


# 当前执行步骤 (由 EXECUTE 模式在开始执行某步骤时更新)
> 正在执行: "2 & 3. **文件: `app/(tabs)/Profile.tsx`** - **任务:** 重新设计个人资料页面并实现登出功能。"

# 任务进度 (由 EXECUTE 模式在每步完成后追加)
*   [2024-07-28 10:15]
    *   步骤：1. **文件: `app/index.tsx`** - **任务:** 修改 `onAuthStateChanged` 以正确处理用户登录和登出状态。
    *   修改：`app/index.tsx`
    *   更改摘要：更新了 `onAuthStateChanged` 监听器，以处理用户登出时的情况。现在，当 `userInfo` 为 `null` 时，它会清除用户上下文并导航到根路径。
    *   原因：执行计划步骤 1
    *   阻碍：无
    *   用户确认状态：[待确认]
*   [2024-07-28 10:20]
    *   步骤：2 & 3. **文件: `app/(tabs)/Profile.tsx`** - **任务:** 重新设计个人资料页面并实现登出功能。
    *   修改：`app/(tabs)/Profile.tsx`
    *   更改摘要：完全重构了个人资料页面，引入了美观的 UI，包括头像、信息卡片和图标。同时，添加了功能完备的登出按钮，并修复了因此产生的 linter error。
    *   原因：执行计划步骤 2 & 3
    *   阻碍：无
    *   用户确认状态：[待确认]

# 最终审查 (由 REVIEW 模式填充)
- **`app/index.tsx`**: 实施与计划完全一致。`onAuthStateChanged` 监听器现在能够正确处理用户登出，通过清除用户状态并重定向到根页面，修复了原有的潜在 bug。
- **`app/(tabs)/Profile.tsx`**: 实施与计划完全一致。UI 已被彻底重构，呈现出一个美观、信息丰富的个人资料页面，包含了所有计划中的元素（头像、信息卡片、图标）。登出功能也已正确实现，包括调用 `signOut` 和本地重定向，以提供流畅的用户体验。初始的 linter 错误也得到了妥善解决。
- **结论**: 所有计划中的任务都已成功完成。实施的代码与最终计划完全匹配，没有发现任何偏差。 