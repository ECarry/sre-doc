# Quiz 组件使用说明

Quiz 组件已集成到 MDX 中，支持三种题型：判断题、单选题和多选题。

## 功能特性

- ✅ **判断题** - 正确/错误选项
- ✅ **单选题** - 单个正确答案
- ✅ **多选题** - 多个正确答案
- ✅ 即时反馈和答案解析
- ✅ 重新作答功能
- ✅ 自动折叠（超过3题时）
- ✅ 深色模式支持

## 在 MDX 中使用

### 判断题示例

```mdx
<Quiz
  title="OSI 模型判断题"
  questions={[
    {
      id: 'q1',
      type: 'boolean',
      question: 'OSI 参考模型共有 7 层',
      correctAnswer: 'true',
      explanation: 'OSI 参考模型从下到上分为：物理层、数据链路层、网络层、传输层、会话层、表示层、应用层，共 7 层。'
    },
    {
      id: 'q2',
      type: 'boolean',
      question: 'TCP/IP 模型和 OSI 模型的层数相同',
      correctAnswer: 'false',
      explanation: 'TCP/IP 模型只有 4 层，而 OSI 模型有 7 层。'
    }
  ]}
/>
```

### 单选题示例

```mdx
<Quiz
  title="网络层知识测试"
  questions={[
    {
      id: 'q3',
      type: 'single',
      question: '以下哪个协议工作在 OSI 模型的网络层？',
      options: [
        { label: 'HTTP', value: 'http' },
        { label: 'TCP', value: 'tcp' },
        { label: 'IP', value: 'ip' },
        { label: 'Ethernet', value: 'ethernet' }
      ],
      correctAnswer: 'ip',
      explanation: 'IP 协议工作在网络层，负责数据包的路由和转发。'
    }
  ]}
/>
```

### 多选题示例

```mdx
<Quiz
  title="传输层协议"
  questions={[
    {
      id: 'q4',
      type: 'multiple',
      question: '以下哪些是传输层协议？（多选）',
      options: [
        { label: 'TCP', value: 'tcp' },
        { label: 'UDP', value: 'udp' },
        { label: 'IP', value: 'ip' },
        { label: 'SCTP', value: 'sctp' }
      ],
      correctAnswer: ['tcp', 'udp', 'sctp'],
      explanation: 'TCP、UDP 和 SCTP 都是传输层协议，而 IP 是网络层协议。'
    }
  ]}
/>
```

### 混合题型示例

```mdx
<Quiz
  title="网络基础综合测试"
  questions={[
    {
      id: 'q1',
      type: 'boolean',
      question: 'OSI 模型的应用层是最靠近用户的一层',
      correctAnswer: 'true',
      explanation: '应用层是 OSI 模型的第 7 层，直接为用户应用程序提供网络服务。'
    },
    {
      id: 'q2',
      type: 'single',
      question: '数据链路层的主要功能是什么？',
      options: [
        { label: '路由选择', value: 'routing' },
        { label: '差错检测', value: 'error' },
        { label: '会话管理', value: 'session' },
        { label: '数据加密', value: 'encryption' }
      ],
      correctAnswer: 'error',
      explanation: '数据链路层负责将比特组合成帧，并进行差错检测。'
    },
    {
      id: 'q3',
      type: 'multiple',
      question: '以下哪些属于 OSI 模型的上三层？',
      options: [
        { label: '应用层', value: 'app' },
        { label: '表示层', value: 'presentation' },
        { label: '会话层', value: 'session' },
        { label: '传输层', value: 'transport' }
      ],
      correctAnswer: ['app', 'presentation', 'session'],
      explanation: 'OSI 模型的上三层是应用层、表示层和会话层。'
    }
  ]}
/>
```

## 属性说明

### Quiz 组件属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `title` | `string` | `"练习题"` | 题目集标题 |
| `questions` | `QuizQuestion[]` | 必填 | 题目数组 |

### QuizQuestion 对象

| 属性 | 类型 | 必填 | 说明 |
|------|------|------|------|
| `id` | `string` | ✅ | 题目唯一标识 |
| `type` | `'boolean' \| 'single' \| 'multiple'` | ✅ | 题目类型 |
| `question` | `string` | ✅ | 题目内容 |
| `options` | `QuizOption[]` | 单选/多选必填 | 选项列表（判断题无需提供） |
| `correctAnswer` | `string \| string[]` | ✅ | 正确答案（多选题为数组） |
| `explanation` | `string` | ❌ | 答案解析 |

### QuizOption 对象

| 属性 | 类型 | 说明 |
|------|------|------|
| `label` | `string` | 选项显示文本 |
| `value` | `string` | 选项值 |

## 样式说明

组件使用 TailwindCSS 样式，支持：
- 自动适配深色/浅色主题
- 响应式布局
- 交互式反馈（hover、选中状态）
- 正确/错误答案的视觉提示（绿色/红色）

## 注意事项

1. **判断题**的 `correctAnswer` 使用 `'true'` 或 `'false'` 字符串
2. **单选题**的 `correctAnswer` 是单个字符串
3. **多选题**的 `correctAnswer` 是字符串数组
4. 题目超过 3 道时会自动折叠，用户可点击展开
5. 每道题可以重新作答
6. 提交后会显示正确答案和解析（如果提供）
