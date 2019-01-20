module.exports = {
	env: {
		browser: true,
		commonjs: true,
		es6: true
	},
	extends: ['plugin:react/recommended', 'prettier'],
	parser: 'babel-eslint',
	parserOptions: {
		ecmaFeatures: {
			jsx: true
		},
		ecmaVersion: 2018,
		sourceType: 'module'
	},
	plugins: ['react', 'prettier'],
	rules: {
		indent: [0, 'tab'],
		'linebreak-style': [0, 'windows'],
		quotes: [2, 'single', { allowTemplateLiterals: true }],
		semi: [2, 'always'],
		'arrow-body-style': 0, //[0, 'always']
		'no-spaced-func': 2, //函数调用时 函数名与()之间不能有空格
		'no-sparse-arrays': 2, //禁止稀疏数组， [1,,2]
		'no-undef': 1, //不能有未定义的变量
		'no-var': 0, //禁用var，用let和const代替
		'no-const-assign': 2, //禁止修改const声明的变量
		'no-eval': 1, //禁止使用eval
		'arrow-parens': 0, //箭头函数用小括号括起来 [0, 'as-needed']
		'arrow-spacing': 0, //=>的前/后括号 [0, { before: true, after: true }]
		'no-console': 0, //禁止使用console
		'no-debugger': 2, //禁止使用debugger
		'no-unused-vars': 0, //不能有声明后未被使用的变量或参数
		'no-extra-semi': 2, //禁止多余的冒号
		'no-empty-function': 1, //禁止空的函数
		'no-alert': 2, //禁止使用alert
		radix: 0, //parseInt必须指定第二个参数
		eqeqeq: 2, //使用===
		'default-case': 2, //switch必须有default
		'no-nested-ternary': 0, //禁止使用嵌套的三目运算
		'no-redeclare': 2, //禁止变量重新声明
		'no-multiple-empty-lines': 0, //没有空行 [0, { max: 0 }]
		'jsx-quotes': [2, 'prefer-single'],
		'react/jsx-uses-vars': 1,
		'react/no-string-refs': 2,
		'react/prop-types': 0,
		'react/no-children-prop': 0,
		'react/jsx-key': 1,
		'react/no-unescaped-entities': 0,
		'react/no-deprecated': 0,
		'react/no-direct-mutation-state': 2,
		'react/jsx-no-target-blank': 1
	}
};
