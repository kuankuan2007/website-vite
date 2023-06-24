import docs from './docs'
import repositories from './repositories'
export default {
    "width":270,
    "title":"菜单",
    "nav": [
        {
            "href": "/",
            "word": "主页",
            "icon": "\ue800"
        },
        {
            "href": "/blogs/",
            "word": "博客",
            "icon": "\ue801"
        },
        {
            "href": "/docs/",
            "word": "帮助",
            "icon": "\ue802",
            "subNav": {
                "title": "帮助",
                "width":380,
                "struct": {
                    "href": "/docs/docsPage.html?name=%(name)s",
                    "word": "%(title)s",
                    "icon": "\ue806"
                },
                "data": {
                    "value": docs,
                    "obj": [
                        "pageList"
                    ]
                }
            }
        },
        {
            "href": "/words/",
            "word": "一言",
            "icon": "\ue803"
        },
        {
            "href": "/contactInformation/",
            "word": "联系我们",
            "icon": "\uf2b9"
        },
        {
            "href": "/feedback/",
            "word": "反馈",
            "icon": "\uf2b6"
        },
        {
            "href": "/chat/",
            "word": "聊天",
            "icon": "\ue813"
        },
        {
            "href": "/chatgpt/",
            "word": "ChatGPT",
            "icon": "\uf18d"
        },
        {
            "href": "https://pypi.org/user/kuankuan/",
            "word": "PyPI",
            "icon": "\ue808"
        },
        {
            "href": "https://members.opensource.org/user/kuankuan/",
            "word": "OSI",
            "icon": "\ue807"
        },
        {
            "href": "https://gitee.com/kuankuan2007",
            "word": "Gitee",
            "icon": "\uf053",
            "subNav": {
                "title": "Gitee",
                "width":330,
                "struct": {
                    "href": "https://gitee.com/kuankuan2007/%(name)s",
                    "word": "%(title)s",
                    "icon": "\ue80a"
                },
                "data": {
                    "value":repositories,
                    "obj": []
                }
            }
        },
        {
            "href": "https://gitlab.com/kuankuan2007",
            "word": "Gitlab",
            "icon": "\ue814",
            "subNav": {
                "title": "Gitlab",
                "width":330,
                "struct": {
                    "href": "https://gitlab.com/kuankuan2007/%(name)s",
                    "word": "%(title)s",
                    "icon": "\ue80a"
                },
                "data": {
                    "value":repositories,
                    "obj": []
                }
            }
        },
        {
            "href": "https://github.com/kuankuan2007",
            "word": "Github",
            "icon": "\uf056",
            "subNav": {
                "title": "Github",
                "width":330,
                "struct": {
                    "href": "https://github.com/kuankuan2007/%(name)s",
                    "word": "%(title)s",
                    "icon": "\ue80a"
                },
                "data": {
                    "value":repositories,
                    "obj": []
                }
            }
        }
    ]
}