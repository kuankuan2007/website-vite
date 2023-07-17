import{_ as I,m as g,a as u,a0 as o,o as C,b as a,d as l,u as m,e as i,x as W,v as K,F as e,a1 as r,p,f as b,i as L}from"./all-7fb1665d.js";import{d as n,m as A}from"./header-93f915ff.js";import{_ as v}from"./markdownShower-23abf85c.js";const D={key:0,class:"center"},k={class:"main"},Z={class:"buttons"},Q=[(I=>(p("data-v-33fb3e26"),I=I(),b(),I))((()=>i("p",{class:"button download demo-icon"},"",-1)))];L(I({__name:"App",setup(I){const p=g("name","unknown");let b=u(null),L=u(!1),G=u("");for(var Y=0;Y<n.pageList.length;Y++)n.pageList[Y].name==p&&(b.value=n.pageList[Y]);var O;return null===b.value&&o("文档不存在",(()=>{location.href="/docs/"})),fetch((O=p,new URL(Object.assign({"../../../src/data/docs/connector.md":"data:text/markdown;base64,IyDov57ngrnlmagNCg0KLS0tDQoNCiMjIOeugOS7iw0KDQotLS0NCg0K5LiA5Liq6Ieq5bex5YaZ55qE6L+e54K55ZmoDQoNCuWFtuWunuWOn+eQhuW+iOeugOWNlSzlvZPmo4DmtYvliLDlkIjpgILnmoTmjInplK7mjInkuIvnmoTml7blgJnlsLHov57nu63ngrnlh7ss5Lmf5Y+v5Lul6K6+572u5Li65byA5YWz5qih5byPDQoNCiMjIOWuieWFqOitpuWRig0KDQotLS0NCg0K5Ye6546w6L+H5LiA5pem5byA5aeL5bCx5YGc5LiN5LiL5p2l55qE5oSP5aSW6ZSZ6K+vLOW3sue7j+S/ruWkjeS6huOAguS9huS8l+aJgOWRqOefpWJ1Z+aYr+aUueS4jeWujOeahCzmiYDku6XmoLnmja7kuInmlrnlupPoh6rluKbnmoTlronlhajorr7nva4NCg0KKio8dT7lvZPkvaDnmoTpvKDmoIfov57nu63ngrnlh7vml7blpITkuo7lt6bkuIrop5IoMCwwKeS9jee9rueahOaXtuWAmSzkvJrlvLrooYzpmLvmlq3nqIvluo/lvLnnqpforablkYrlubbpgIDlh7o8L3U+KioNCg0Kfn4qKjx1PuWQjOagt+S9oOS5n+WPr+S7pemHjeWQr+ino+WGs+S4gOWIh+mXrumimDwvdT4qKn5+DQoNCiMjIOS9v+eUqOivtOaYjg0KDQotLS0NCg0KKyDli77kuIrnmoTmjInplK7kvJrooqvov57ngrkNCg0KKyDlvZPnhKbngrnlnKjkuLvnqpflj6PkuIrml7Ys54K55Ye75LqL5Lu25Lya6KKr56aB55SoDQoNCisg5qih5byP5pyJ5Lik56eNLOaMieS4i+WSjOW8gOWFsw0KICANCiAgICAgKyDmjInkuIs65p2+5byA5bCx5YGc5q2iDQogIA0KICAgICArIOW8gOWFszrlv4Xpobvlho3mrKHmjInkuIvmiY3og73lgZzmraINCg0KIyMg5YWz5LqO5L2c6ICFDQoNCuS9nOiAheS4u+mhtVvlrr3lrr0yMDA3XShrdWFua3VhbjIwMDcuZ2l0ZWUuaW8gIuS9nOiAheS4u+mhtSIpDQoNCuacrOmhueebruWcqFvov57ngrnlmag6IOi/nueCueWZqCAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L2Nvbm5lY3RvcinkuIrlvIDmupANCg==","../../../src/data/docs/dns-speed-measurement.md":"data:text/markdown;base64,IyBETlPmtYvpgJ8NCg0KIyMg6aOf55So5pa55rOVDQoNCi0tLQ0KDQrkuKrkurrmhJ/op4nog73nnIvmh4LkuK3mloflupTor6XmsqHku4DkuYjpmr7luqblkKcuLi4NCg0KKirms6jmhI/kuovpobkqKg0KDQorIOivt+axguexu+Wei+S4gOiIrOaDheWGteS4i+mDveaYryJBIizlkITkuKrnsbvlnovms6jph4rlpoLkuIs6W+WPgueFp+aVmeeoi10oaHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2NoZW4xNDE1ODg2MDQ0L2FydGljbGUvZGV0YWlscy8xMDgzMjA3NDUgIkNTRE4iKQ0KICANCiAgICAgKyBB6K6w5b2V77ya5bCG5Li75py65ZCN6L2s5o2i5oiQSVDlnLDlnYANCiAgDQogICAgICsgTVjorrDlvZXvvJrpgq7ku7bkuqTmjaLorrDlvZXvvIzlrprkuYnpgq7ku7bmnI3liqHlmajnmoTln5/lkI0NCiAgDQogICAgICsgQ05BTUXorrDlvZXvvJrliKvlkI3orrDlvZXvvIzlrp7njrDln5/lkI3pl7TnmoTmmKDlsIQNCiAgDQogICAgICsgTlPorrDlvZXvvJrmoIforrDljLrln5/nmoTln5/lkI3mnI3liqHlmajlj4rmjojmnYPlrZDln58NCiAgDQogICAgICsgUFRS6K6w5b2V77ya5Y+N5ZCR6Kej5p6Q77yM5LiOQeiusOW9leebuOWPje+8jOWwhklQ5Zyw5Z2A6L2s5o2i5Li65Li75py65ZCNDQogIA0KICAgICArIFNPQeiusOW9le+8mlNPQeagh+iusO+8jOS4gOS4qui1t+Wni+aOiOadg+WMuueahOWumuS5iQ0KDQorIOeUseS6jua2ieWPiuezu+e7n+iuvue9rizkvJropoHmsYLku6XnrqHnkIblkZjmnYPpmZDov5DooYwNCg0KIyMg5L2c6ICF5L+h5oGvDQoNCuacrOmhueaYr1tAa3Vhbmt1YW4yMDA3XShodHRwczovL2t1YW5rdWFuMjAwNy5naXRlZS5pby8gIuS9nOiAheS4u+mhtSIp5Y+C6ICD5ZCE57G75pWZ56iL5ZCO54us56uL5a6M5oiQ55qE5Yid54mIDQoNCioq5aaC5pyJ6Zu35ZCM77yM57qv5bGe5ben5ZCIKioNCg0K6aG555uu5byA5rqQ5Zyw5Z2AW+iLn+a1qemTrS9ETlPmtYvpgJ8gKGdpdGVlLmNvbSldKGh0dHBzOi8vZ2l0ZWUuY29tL2t1YW5rdWFuMjAwNy9kbnMtc3BlZWQtbWVhc3VyZW1lbnQpDQo=","../../../src/data/docs/do-folder.md":"data:text/markdown;base64,IyDmlofku7blpLnnrqHnkIYoZG9Gb2xkZXIpDQoNCmBgYGJhc2gNCnBpcCBpbnN0YWxsIGRvRm9sZGVyDQpgYGANCg0KIyMg5L2/55So5pa55rOVDQoNCiMjIyDlr7zlhaUNCg0KYGBgcHl0aG9uDQppbXBvcnQgZG9Gb2xkZXINCmBgYA0KDQojIyMg6YOo5YiG5Yqf6IO9DQoNCisgYEZvbGRlcmAg5oyH5LiA5Liq5paH5Lu25aS5DQoNCiAgICArIF/lj4LmlbBfIGBwYXRoYCDmlofku7blpLnot6/lvoQ6YHN0cnxkb0ZvbGRlci5QYXRoYA0KICAgICsgX+WPguaVsF8gYG9ubGlzdGVuYCDmmK/lkKbnm5HlkKzmr5TlkIzmraXmlofku7blpLnlj5jliqg6YGJvb2xgDQogICAgKyBf5Y+C5pWwXyBgc2NhbmAg5piv5ZCm5Zyo546w5Zyo5omr5o+PKOWQpuWImeS8muWcqOiuv+mXruaXtui/m+ihjOaJq+aPjykNCiAgICArIF/lsZ7mgKdfIGBmaWxlc2Ag5paH5Lu25aS55Lit55qE5paH5Lu25YiX6KGoOmBGaWxlTGlzdGANCiAgICArIF/lsZ7mgKdfIGBzdWJmb2xkZXJgIOaWh+S7tuWkueS4reeahOWtkOaWh+S7tuWkuTpgRm9sZGVyTGlzdGANCiAgICArIF/mlrnms5VfIGBoYXNGb2xkZXIsaGFzRmlsZWAg5piv5ZCm5YyF5ous5p+Q5Liq5paH5Lu2L+aWh+S7tuWkuSzlj4LmlbDkuLogYHN0cmDml7bpu5jorqTljLnphY0gYC5uYW1lYOWxnuaApw0KICAgICsgX+aWueazlV8gYHJlbW92ZSxjb3B5LG1vdmVgIOaWh+S7tuWkueaTjeS9nA0KICAgICsgX+aWueazlV8gYHNlYXJjaGAg5pCc57Si5paH5Lu25aS555qE5YaF5a65DQogICAgICAgICsgX+WPguaVsF8gYGNvbmRpdGlvbmAg5pCc57Si5p2h5Lu2OmBMaXN0W1VuZm9ybWF0dGVkTWF0Y2hpbmddYA0KICAgICAgICArIF/lj4LmlbBfIGBhaW1gIOebruaghzogYCJmaWxlInwiZm9sZGVyInwiYm90aCJgDQogICAgICAgICsgX+WPguaVsF8gYHRocmVhZGVkYCDmmK/lkKbnur/nqIvljJYgYGJvb2xgDQogICAgICAgICsgX+WPguaVsF8gYHRocmVhZGVkYCDmnIDlpKfnur/nqIvmlbA6YGludGANCiAgICAgICAgKyBf6L+U5ZueXyDmkJzntKLnu5Pmnpw6YFNlYXJjaFJlc3VsdGANCisgYEZpbGVgIOaMh+S4gOS4quaWh+S7tg0KDQogICAgKyBf5Y+C5pWwXyBgcGF0aGAg5paH5Lu26Lev5b6EOmBzdHJ8ZG9Gb2xkZXIuUGF0aGANCiAgICArIF/mlrnms5VfIGByZW1vdmUsY29weSxtb3ZlYCDmlofku7bmk43kvZwNCiAgICArIF/lsZ7mgKdfIGBtb2RlLGlubyxkZXYsdWlkLGdpZC4uLmAg5Y+C6KeBIGBvcy5zdGF0YA0KKyBgUGF0aGAg5oyH5LiA5Liq6Lev5b6EDQorIF/lj4LmlbBfIGBwYXRoYCDot6/lvoQo57ud5a+55oiW55u45a+5KTpgc3RyYA0KDQogICAgKyBf5bGe5oCnXyBgcGFydGl0aW9uYCDlsIbot6/lvoQo5LiN5YyF5ZCr6amx5Yqo5ZmoKeWIh+eJhw0KICAgICsgX+aWueazlV8gYGFkZGAg5bCG5YaF5a655Yqg6L296Lev5b6E5ZCO6Z2iDQogICAgKyBf5pa55rOVXyBgZmluZFJlc3RgIOWOu+mZpOS4pOS4qui3r+W+hOeahOWFseWQjOmDqOWIhg0KKyBgY29tcGFyZWDmj5Dkvpvmr5TovoPmlofku7blpLnnmoRBUEkNCg0KICAgICsgX+WHveaVsF8gYGNvbXBhcmVgIOavlOi+g+S4pOS4quaWh+S7tuWkuQ0KDQogICAgICAgICsgX+WPguaVsF8gYGZvbGRlcjEmZm9sZGVyMmAgX+avlOi+g+eahOaWh+S7tuWkuTpgRm9sZGVyYF8NCiAgICAgICAgKyBf5Y+C5pWwXyBgY29tcGFyZUNvbnRlbnRgIOaWh+S7tuWGheWuueeahOavlOi+g+aWueazlTpgc3RyfENhbGxhYmxlW1tkb0ZvbGRlci5GaWxlLGRvRm9sZGVyLkZpbGVdLGJvb2xdYA0KICAgICAgICArIF/lj4LmlbBfIGB0aHJlYWRlZGAg5piv5ZCm57q/56iL5YyWIGBib29sYA0KICAgICAgICArIF/lj4LmlbBfIGB0aHJlYWRlZGAg5pyA5aSn57q/56iL5pWwOmBpbnRgDQogICAgICAgICsgKui/lOWbniog5q+U6L6D57uT5p6cOmBDb21wYXJlUmVzdWx0YA0KDQojIyMg5ZG95Luk6KGM5L2/55SoDQoNCmBgYGJhc2gNCmNvbXBhcmUgRm9sZGVyMSBGb2xkZXIyIFstYyBdIFstdCBbLW4gbnVtXV0NCmBgYA0KDQrlhbfkvZPkvZznlKjlj4Lop4ENCg0KYGBgYmFzaA0KY29tcGFyZSAtaA0KYGBgDQoNCiMjIOWFs+S6juS9nOiAhQ0KDQrkvZzogIXkuLvpobVb5a695a69MjAwN10oaHR0cHM6Ly9rdWFua3VhbjIwMDcuZ2l0ZWUuaW8gIuS9nOiAheS4u+mhtSIpDQoNCuacrOmhueebruWcqFvoi5/mtanpk60v5paH5Lu25aS5566h55CGIChnaXRlZS5jb20pXShodHRwczovL2dpdGVlLmNvbS9rdWFua3VhbjIwMDcvZG8tZm9sZGVyKeS4iuW8gOa6kA0KDQrluK7liqnmlofmoaPlj4Lop4Fb5a695a6955qE5biu5Yqp5paH5qGjIChnaXRlZS5pbyldKGh0dHBzOi8va3Vhbmt1YW4yMDA3LmdpdGVlLmlvL2RvY3MvZG8tZm9sZGVyLykNCg0KcHlwaeWumOe9kemhueebruWcsOWdgFtQeXBpXShodHRwczovL3B5cGkub3JnL3Byb2plY3QvZG9Gb2xkZXIvKQ0K","../../../src/data/docs/excel-pinyin.md":"data:text/markdown;base64,IyBFeGNlbOaLvOmfsw0KDQrnlKjkuo7lnKhFeGNlbOS4reWwhuaxieWtl+aNouS4uuaLvOmfs+eahOWujw0KDQojIyDkvb/nlKgNCg0K5bCG6L+Z5Liq5a6P5Yqg5YWlRXhjZWwNCg0K5L2/55So5Ye95pWwZ2V0cHnlsIblrZfnrKbkuLLovazljJbkuLrmi7zpn7MNCg0K5L2/55So5Ye95pWwZ2V0c3pt5bCG5a2X56ym5Liy6L2s5YyW5Li65ou86Z+z6aaW5a2X5q+NDQoNCnJlcGxhY2VXb3Jk5Y+C5pWw5o6n5Yi25pyq55+l5a2X56ym55qE5pu/5o2i5YC8DQoNCmVtcHR5V29yZOWPguaVsOaOp+WItuepuuWtl+espueahOi/lOWbnuWAvA0KDQrmi7zpn7Plj5bluLjnlKjmi7zpn7PvvIzlpJrpn7PlrZflj6/og73kvJrlh7rnjrDplJnor68NCg0K5ou86Z+z5LmL6Ze05L2/55So56m65qC85YiG6ZqUDQoNCiMjIyBlLmcuDQoNCmBgYGV4Y2VsLWZvcm11bGENCj1nZXRweSgi6L+Z6YeM5piv5a695a6955qE5L2c5ZOBLOaIkeaYr+WuveWuvSIsIl4iKQ0KDQotPmt1YW4ga3VhbiBkZSB6dW8gcGluIF4gd28gc2hpIGt1YW4ga3Vhbg0KDQo9Z2V0cHkoIui/memHjOaYr+WuveWuveeahOS9nOWTgSzmiJHmmK/lrr3lrr0iKQ0KDQotPmt1YW4ga3VhbiBkZSB6dW8gcGluID8gd28gc2hpIGt1YW4ga3Vhbg0KDQo9Z2V0c3ptKCLlrr3lrr3nmoTkvZzlk4EiKQ0KDQotPmtrZHpwDQoNCj1nZXRzem0oIiIsIj8iLCLnqboiKQ0KDQotPuepug0KYGBgDQoNCiMjIOWFs+S6juS9nOiAhQ0KDQrkvZzogIXkuLvpobVb5a695a69MjAwN10oaHR0cHM6Ly9rdWFua3VhbjIwMDcuZ2l0ZWUuaW8gIuS9nOiAheS4u+mhtSIpDQoNCuacrOmhueebruWcqFvoi5/mtanpk60vRXhjZWzmi7zpn7MgKGdpdGVlLmNvbSldKGh0dHBzOi8vZ2l0ZWUuY29tL2t1YW5rdWFuMjAwNy9leGNlbC1waW55aW4p5LiK5byA5rqQDQo=","../../../src/data/docs/folder-synchronization.md":"data:text/markdown;base64,IyDmlofku7blpLnmr5Tlr7kKCiMjIDxtYXJrPuitpuWRijrmnKzpobnnm67lt7Lnu4/lup/lvIPvvIzlhbblip/og73ooqtkb0ZvbGRlcuabv+S7ozwvbWFyaz4KCi0gW+WuveWuveeahOW4ruWKqeaWh+ahoyAoZ2l0ZWUuaW8pXShodHRwczovL2t1YW5rdWFuMjAwNy5naXRlZS5pby9kb2NzL2RvLWZvbGRlci8pCi0gW+aWh+S7tuWkueeuoeeQhjog5Z+65LqOcHl0aG9u55qE5paH5Lu25aS5566h55CG5bqTIChnaXRlZS5jb20pXShodHRwczovL2dpdGVlLmNvbS9rdWFua3VhbjIwMDcvZG8tZm9sZGVyKQotIFtkb0ZvbGRlciDCtyBQeVBJXShodHRwczovL3B5cGkub3JnL3Byb2plY3QvZG9Gb2xkZXIvKQoKIyMg55uu55qECgroh6rliqjmr5Tlr7njgIHlkIzmraXkuKTkuKrmlofku7blpLkKCiMjIOivtOaYjgoK6L+Z5Liq6aG555uu5piv5pys5Lq65b6I5pep5Lul5YmN5YaZ55qE5bel5YW35YyF5paH5Lu25aS56Ieq5Yqo5pu05paw56iL5bqP55qE5Y2H57qn54mICgrnkIborrrkuIrmlK/mjIHku7vmhI/kuKTkuKrmlofku7blpLnvvIzkuI3noa7lrprmnInmsqHmnIlidWcKCiMjIOaJq+aPj+WujOaIkOWQjueahOaMh+S7pAoK5ZG95Luk5qC85byPOioq5ZG95LukL+epuuagvC/pgInmi6nlmagqKgoKKyDlkb3ku6TmnInlpoLkuIvlh6Dnp40o5LiN5YiG5aSn5bCP5YaZKToKICAKICAgICArIGNvcHk65bCG56ym5ZCI6YCJ5oup5Zmo55qE6aG555uu56e75YWlQ29weQogICAgICsgbm9uZTrlsIbnrKblkIjpgInmi6nlmajnmoTpobnnm67np7vlhaVOb25lCiAgICAgKyBkZWxldGU65bCG56ym5ZCI6YCJ5oup5Zmo55qE6aG555uu56e75YWlRGVsZXRlCiAgICAgKyDku6XkuIrkuInkuKrlkb3ku6TkuI3kvJrlr7lbQ29weWVkLERlbGV0ZWQsRXJyb3dd5Lit55qE6aG555uu6L+b6KGM5pON5L2cCiAgICAgKyBoZWxwOuaYvuekuuatpOW4ruWKqeiPnOWNlQogICAgICsgZXhpdCDpgIDlh7rnqIvluo8KICAgICArIGNob2865LuF5bGV56S66YCJ5oup5Zmo57uT5p6c77yM5LiN6L+b6KGM5pON5L2cCiAgICAgKyBleGVjdXRlOuaMieavj+S4qumhueebrueahOexu+WIq+i/m+ihjOaTjeS9nAogICAgICsgY2xzOua4heWxjwoKKyDpgInmi6nlmago5Yy65YiG5aSn5bCP5YaZKe+8mgogIAogICAgICsg6YCJ5oup5Zmo5pys6LSo5piv5LiA5Liq6ZuG5ZCI77yM5Lule33ljIXmi6wKICAKICAgICArICoq5pyJ5aaC5LiL54m55q6K5a6a5LmJKOS7pSPlvIDlpLTlhajpg6jlpKflhpkpKirvvJoKICAKICAgICArIFwjQUxMOuWFqOmbhgogICAgICAgCiAgICAgICAgICArIFwjTkFNRSgicyIpOuWQjeWtl+aYr3PnmoTpobnnm67nu4TmiJDnmoTpm4blkIgKICAgICAgICAgICsgXCNUWVBFKCJzIik656eN57G75pivc+eahOmhueebrue7hOaIkOeahOmbhuWQiAogICAgICAgICAgKyBcI1JPT1RQQVRIKCJzIik65qC555uu5b2V5pivc+eahOmhueebrue7hOaIkOeahOmbhuWQiAogICAgICAgICAgKyBcI1dBWSgicyIpOuWkhOeQhuaWueW8j+aYr3PnmoTpobnnm67nu4TmiJDnmoTpm4blkIgKCisg6ZuG5ZCI55qE6L+Q566XOgogIAogICAgICsgQeS6pEIgQSZCCiAgICAgKyBB5bm2QiBBfEIKICAgICArIELlhbPkuo5B55qE6KGl6ZuGIEFeQgoKKyDnpLrkvos6CiAgCiAgICAgKyB7MCwxLDIsM33nvJblj7fkuLox44CBMuOAgTPnmoTpobnnm64KICAgICArIFwjTkFNRSgiXHB5My44Iikg5ZCN5a2X5Li6XHB5My44XOeahOmhueebrgogICAgICsgXCNBTExeI05BTUUoIlxweTMuOCIpIOWQjeWtl+S4jeaYr1xweTMuOFznmoTpobnnm64KCiMjIOS9nOiAhQoKa3Vhbmt1YW4yMDA3KFvkuKrkurrkuLvpobVdKGh0dHBzOi8va3Vhbmt1YW4yMDA3LmdpdGVlLmlvKSkKCuacrOmhueebruWcqFvmlofku7blpLnlkIzmraU6IOiHquWKqOWQjOatpeS4pOS4quaWh+S7tuWkueeahOaWh+S7tiAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L2ZvbGRlci1zeW5jaHJvbml6YXRpb24p5LiK5byA5rqQCg==","../../../src/data/docs/ghm-base64-encoder.md":"data:text/markdown;base64,IyBHSE0tQkFTRTY057yW56CB5ZmoDQoNCuW4ruWKqee9kee7nOaWh+WMlueahOS8oOaSrQ0KDQojIyBHSE0tQkFTRTY05paH5Lu25qC85byPDQoNCum7mOiupOWQjue8gOS4uiAqKi5HSE1CQVNFNjQqKg0KDQrlj6/ku6XmoIfms6jmlofku7blkI3jgIHmlbDmja7nsbvlnovnrYkNCg0KIyMjIOagh+ivhuespuivtOaYjg0KDQorIFwj5byA5aS055qE6KGM5piv5qCH5rOo6KGMLOS4jeiDveino+eggQ0KDQorIOWktOmDqOagh+ivhiAqKlwjU0FWSU5HIFdJVEggR0hNLUJBU0U2NCoqDQoNCisg57G75Z6L5qCH6K+G56ymDQogIA0KICAgICArIOaWh+S7tiAqKlwjRklMRVt85paH5Lu25ZCNXSoqDQogIA0KICAgICArIOaWh+acrCAqKlwjVEVYVCoqDQoNCisg5bC+6YOo5qCH6K+G56ymICoqXCNFTkQgT0YgRE9DVU1FTlQqKg0KDQojIyMg5Y+C6ICD5qC85byPOg0KDQpcI1NBVklORyBXSVRIIEdITS1CQVNFNjQgPG1hcms+5aS06YOo5qCH5rOo6KGMPC9tYXJrPg0KDQpcI0ZJTEV8ZXhhbXBsZS5wbmcgICAgICAgICAgICAgICAgICA8bWFyaz7lkI3lrZflj6tleGFtcGxlLnBuZ+eahOaWh+S7tjwvbWFyaz4NCg0KQUJDICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxtYXJrPuaVsOaNruWdlzE8L21hcms+DQoNClwjRklMRSAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcms+5pyq5oyH5a6a5ZCN5a2X55qE5paH5Lu25bCG5Lya5Zyo6Kej56CB5pe26K+i6ZeuPC9tYXJrPg0KDQpBQkMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcms+5pWw5o2u5Z2XMjwvbWFyaz4NCg0KXCNURVhUICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcms+57qv5paH5pysPC9tYXJrPg0KDQpBQkMgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG1hcms+5pWw5o2u5Z2XMzwvbWFyaz4NCg0KXCNFTkQgT0YgRE9DVU1FTlQgICAgICAgICAgICAgIDxtYXJrPuWwvumDqOagh+azqOihjA0KDQojIyDova/ku7bkvb/nlKgNCg0K5pSv5oyB5paH5pys44CB6YCJ5oup5paH5Lu244CB5ouW5ou95paH5Lu244CB5ouW5ou95paH5Lu257uZZXhlKOS9nOS4uuWQr+WKqOWPguaVsCnmiZPlvIANCg0K5paH5Lu25Lya6KaB5rGC6YCJ5oup5L+d5a2Y5paH5Lu25aS5DQoNCiMjIOWFs+S6juS9nOiAhQ0KDQrkvZzogIVb5a695a69MjAwN10oa3Vhbmt1YW4yMDA3LmdpdGVlLmlvICLkvZzogIXkuLvpobUiKQ0KDQrmnKzpobnnm67lnKhb6Iuf5rWp6ZOtL2dobS1iYXNlNjTnvJbnoIHlmaggKGdpdGVlLmNvbSldKGh0dHBzOi8vZ2l0ZWUuY29tL2t1YW5rdWFuMjAwNy9naG0tYmFzZTY0LWVuY29kZXIp5LiK5byA5rqQDQo=","../../../src/data/docs/handwritten-text-generator.md":"data:text/markdown;base64,IyDmiYvlhpnkvZPnlJ/miJDlmagNCg0K5pys56iL5bqP5Z+65LqOUHl0aG9u55qEW2hhbmRyaWdodF0oaHR0cHM6Ly9weXBpLm9yZy9wcm9qZWN0L2hhbmRyaWdodC8gIlB5cGkiKeW6k+WunueOsA0KDQojIyDkvb/nlKjms6jmhI/kuovpobkNCg0KMS4g56Gu6K6k5L2g6YCJ5oup55qE5a2X5L2T5pSv5oyB5L2g5piv55So55qE6K+t6KiADQoyLiDooYzpl7Tot53kuI3lvpflsI/kuo7lrZfkvZPlpKflsI8NCjMuIOeCueWHuyLnlJ/miJAi5LmL5ZCO77yM5ZCO5Y+w5Lya6L+b6KGM6K6h566X44CC55u05YiwIueUn+aIkCLmjInpkq7lho3mrKHlkK/nlKjvvIzku6PooajnlJ/miJDlrozmiJDmiJblh7rnjrDplJnor68NCg0KIyMg5Y+C5pWwDQoNCueQhuiuuuS4iuS4reaWh+iDveeci+aHguWQpy4uLg0KDQorIOWcqEVudHJ55Lit5YaZ5YWl5paw55qE5YC85LmL5ZCO77yM5oyJ5LiLRW50ZXLmiJbkvb/or6VFbnRyeeWkseWOu+eEpueCue+8jOS8muiiq+iupOS4uuehruWumg0KKyDnoa7lrprlkI7ovpPlhaXlgLzlj6/ooYzliJnmm7TmlrDvvIzlkKbliJnkvJrov5jljp8NCisgU2NhbGXkuI5FbnRyeeeahOWAvOWunuaXtuiBlOWKqA0KDQojIyDlhbPkuo7kvZzogIUNCg0K5L2c6ICFW+WuveWuvTIwMDddKGh0dHBzOi8va3Vhbmt1YW4yMDA3LmdpdGVlLmlvICLkvZzogIXkuLvpobUiKQ0KDQrmnKzpobnnm67lnKhb6Iuf5rWp6ZOtL+aJi+WGmeaWh+acrOeUn+aIkOWZqCAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L2hhbmR3cml0dGVuLXRleHQtZ2VuZXJhdG9yKeS4iuW8gOa6kA0K","../../../src/data/docs/long-polling.md":"data:text/markdown;base64,IyDplb/ova7or6IobG9uZ1BvbGxpbmcpDQoNCmBgYGJhc2gNCnBpcCBpbnN0YWxsIGxvbmdQb2xsaW5nIA0KYGBgDQoNCiMjIOWuouaIt+errw0KDQojIyMg5Y2V5ZCR5Lyg6L6TDQoNCmBgYHB5dGhvbg0KaW1wb3J0IGxvbmdQb2xsaW5nDQpleGFtcGxlPWxvbmdQb2xsaW5nLmNsaWVudC5DbGllbnQodXJsLCBjYWxsYmFjaykNCmV4YW1wbGUubG9naW4odWVybmFtZSkNCmBgYA0KDQojIyMg5Y+M5ZCR5Lyg6L6TDQoNCmBgYHB5dGhvbg0KaW1wb3J0IGxvbmdQb2xsaW5nDQpleGFtcGxlPWxvbmdQb2xsaW5nLmNsaWVudC5Cb3Rod2F5Q2xpZW50KHVybCwgY2FsbGJhY2spDQpleGFtcGxlLmxvZ2luKHVlcm5hbWUpDQpleGFtcGxlLnNlbmQoZGF0YSkNCmBgYA0KDQojIyDmnI3liqHnq68NCg0KIyMjIOWNleWQkeS8oOi+kw0KDQpgYGBweXRob24NCmltcG9ydCBsb25nUG9sbGluZw0KZXhhbXBsZT1sb25nUG9sbGluZy5zZXJ2ZXIuU2VydmVyKGhvc3QscG9ydCkNCmV4YW1wbGUuc2VuZCh1c2VybmFtZSxtZXNzYWdlKQ0KYGBgDQoNCiMjIyDlj4zlkJHkvKDovpMNCg0KYGBgcHl0aG9uDQppbXBvcnQgbG9uZ1BvbGxpbmcNCmV4YW1wbGU9bG9uZ1BvbGxpbmcuc2VydmVyLkJvdGh3YXlTZXJ2ZXIoaG9zdCxwb3J0LGNhbGxiYWNrKQ0KZXhhbXBsZS5zZW5kKHVzZXJuYW1lLG1lc3NhZ2UpDQpgYGANCg0KIyMg5YWz5LqO5L2c6ICFDQoNCuS9nOiAheS4u+mhtVvlrr3lrr0yMDA3XShodHRwczovL2t1YW5rdWFuMjAwNy5naXRlZS5pbyAi5L2c6ICF5Li76aG1IikNCg0KcHlwaVtsb25nUG9sbGluZyDCtyBQeVBJXShodHRwczovL3B5cGkub3JnL3Byb2plY3QvbG9uZ1BvbGxpbmcvKQ0KDQrmnKzpobnnm67lnKhb6Iuf5rWp6ZOtL+mVv+i9ruivoiAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L2xvbmctcG9sbGluZynkuIrlvIDmupANCg0K5biu5Yqp5paH5qGj5Y+C6KeBW+WuveWuveeahOW4ruWKqeaWh+aho10oaHR0cHM6Ly9rdWFua3VhbjIwMDcuZ2l0ZWUuaW8vZG9jcy9sb25nLXBvbGxpbmcpDQo=","../../../src/data/docs/multithreaded-download.md":"data:text/markdown;base64,IyDlpJrnur/nqIvkuIvovb3lmagoYXV0b0Rvd25sb2FkKQ0KDQojIyDlronoo4UNCg0KYGBgYmFzaA0KcGlwIGluc3RhbGwgYXV0b0Rvd25sb2FkDQpgYGANCg0KIyMg5L2/55SoDQoNCiMjIyBpbXBvcnQNCg0KYGBgcHl0aG9uDQppbXBvcnQgYXV0b0Rvd25sb2FkDQoNCmF1dG9Eb3dubG9hZC5BdXRvRG93bmxvYWQoVVJMLGZpbGUsa2V5PXZhbHVlLi4uKS5zdGFydCgpDQpgYGANCg0KIyMjIOWRveS7pOihjA0KDQpgYGBiYXNoDQphdXRvLWRvd25sb2FkIFVSTA0KYGBgDQoNCuWFtuS7luWPguaVsOivpuingQ0KDQpgYGBiYXNoDQphdXRvLWRvd25sb2FkIC1oDQpgYGANCg0KIyMg5YWz5LqO5L2c6ICFDQoNCuS9nOiAhVvlrr3lrr0yMDA3XShodHRwczovL2t1YW5rdWFuMjAwNy5naXRlZS5pby8pDQoNCuacrOmhueebruWcqFvlpJrnur/nqIvkuIvovb06IOWkmue6v+eoi+S4i+i9veaWh+S7tiAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L211bHRpdGhyZWFkZWQtZG93bmxvYWQp5byA5rqQDQoNClB5cGnvvJpbYXV0b0Rvd25sb2FkIMK3IFB5UEldKGh0dHBzOi8vcHlwaS5vcmcvcHJvamVjdC9hdXRvRG93bmxvYWQvKQ0K","../../../src/data/docs/qq-robot.md":"data:text/markdown;base64,IyBRUeacuuWZqOS6uijmmbrpmpzlrr3lrr0pDQoNCiMjIOWKn+iDvQ0KDQotIG9wZW5BSeebuOWFsw0KICANCiAgICAgLSBncHQr5YaF5a65OkdQVC0z5Y6f54mI5o+Q6ZeuDQogICAgIC0gdGFsa2dwdCvlhoXlrrk66IGK5aSp5LyY5YyW55qER1BULTPmj5Dpl64o5bim5LiK5LiL5paH5YWz6IGUKQ0KICAgICAtIGNvZGVncHQr5YaF5a65OuS7o+eggeihpeWFqCjmqKHlnotjb2RlLWRhdmluY2ktMDAyKQ0KICAgICAtIGNoYXRncHQr5YaF5a65OuS4jmNoYXRHUFTogYrlpKko5Y6f55Sf5pSv5oyBKQ0KICAgICAtIOWcqOS7u+aEj+WFs+mUruWtl+WJjeWKoG9wZW7nrZTmoYjkvJrmm7TlvIDmlL7jgIHmnInliJvpgKDmgKfjgIHkuI3lkIjluLjnkIYodGVtcGVyYXR1cmXkuLowLjkpDQogICAgIC0g57uY55S7K+WGheWuuTpvcGVuQUnnu5jnlLsNCg0KLSDlpKnmsJQr5Z+O5biCOuiOt+WPluWkqeawlOS/oeaBrw0KDQotIOWcsOWbvivlnLDngrk65p+l6K+i5Zyw5Zu+DQoNCi0g5Lqk6YCaK+WcsOeCuTrmn6Xor6LkuqTpgJrmg4XlhrUNCg0KLSDorqHnrpcr5YaF5a65Oui/kOeul+ihqOi+vuW8jw0KDQotIElQK+WcsOWdgDrmn6Xor6JJUOWcsOWfnw0KDQotIOaWsOmXuzrlrp7ml7bmlrDpl7sNCg0KLSB1cOaQnOe0oivlhbPplK7lrZc65pCc57SiQuermVVQ5Li7DQoNCi0gdXDkv6Hmga8r5YWz6ZSu5a2XOuWxleekukLnq5lVUOS4u+S/oeaBrw0KDQotIGdpdGVlK+WGheWuuTrmkJzntKJHaXRlZeS7k+W6kw0KDQotIGdpdGh1YivlhoXlrrk65pCc57SiR2l0aHVi5LuT5bqTDQoNCi0g5LiA6KiADQoNCi0gYmFzZTY0W+WGheWuuV06YmFzZTY057yW56CBDQoNCi0g5bCP5L2c5paHK+WGheWuuTrni5flsYHkuI3pgJrlsI/kvZzmlocNCg0KLSDliqDlr4Yr5YaF5a65OuWFveivreWKoOWvhg0KDQotIOino+WvhivlhoXlrrk65YW96K+t6Kej5a+GDQoNCi0g57+76K+RK+WGheWuuVslJeebruagh+ivreenjVslJea6kOivreenjV1dOueZvuW6pue/u+ivke+8jOivreenjeS7o+eggeWmguS4iw0KICANCiAgPHRhYmxlPg0KICA8dHI+PHRkPuivreenjTwvdGQ+PHRkPuS7o+eggTwvdGQ+PHRkPuivreenjTwvdGQ+PHRkPuS7o+eggTwvdGQ+PHRkPuivreenjTwvdGQ+PHRkPuS7o+eggTwvdGQ+PC90cj4NCiAgPHRyPjx0ZD7kuK3mloc8L3RkPjx0ZD56aDwvdGQ+PHRkPuiLseivrTwvdGQ+PHRkPmVuPC90ZD48dGQ+57Kk6K+tPC90ZD48dGQ+eXVlPC90ZD48L3RyPg0KICA8dHI+PHRkPuaWh+iogOaWhzwvdGQ+PHRkPnd5dzwvdGQ+PHRkPuaXpeivrSA8L3RkPjx0ZD5qcDwvdGQ+PHRkPumfqeivrTwvdGQ+PHRkPmtvcjwvdGQ+PC90cj4NCiAgPHRyPjx0ZD7ms5Xor60gPC90ZD48dGQ+ZnJhPC90ZD48dGQ+6KW/54+t54mZ6K+tPC90ZD48dGQ+c3BhPC90ZD48dGQ+5rOw6K+tPC90ZD48dGQ+dGg8L3RkPjwvdHI+DQogIDx0cj48dGQ+6Zi/5ouJ5Lyv6K+tPC90ZD48dGQ+YXJhPC90ZD48dGQ+5L+E6K+tPC90ZD48dGQ+cnU8L3RkPjx0ZD7okaHokITniZnor608L3RkPjx0ZD5wdDwvdGQ+PC90cj4NCiAgPHRyPjx0ZD7lvrfor608L3RkPjx0ZD5kZTwvdGQ+PHRkPuaEj+Wkp+WIqeivrTwvdGQ+PHRkPml0PC90ZD48dGQ+5biM6IWK6K+tPC90ZD48dGQ+ZWw8L3RkPjwvdHI+DQogIDx0cj48dGQ+6I235YWw6K+tPC90ZD48dGQ+bmw8L3RkPjx0ZD7ms6LlhbDor608L3RkPjx0ZD5wbDwvdGQ+PHRkPuS/neWKoOWIqeS6muivrTwvdGQ+PHRkPmJ1bDwvdGQ+PC90cj4NCiAgPHRyPjx0ZD7niLHmspnlsLzkupror608L3RkPjx0ZD5lc3Q8L3RkPjx0ZD7kuLnpuqbor608L3RkPjx0ZD5kYW48L3RkPjx0ZD7oiqzlhbDor608L3RkPjx0ZD5maW48L3RkPjwvdHI+DQogIDx0cj48dGQ+5o235YWL6K+tPC90ZD48dGQ+Y3M8L3RkPjx0ZD7nvZfpqazlsLzkupror608L3RkPjx0ZD5yb208L3RkPjx0ZD7mlq/mtJvmloflsLzkupror608L3RkPjx0ZD5zbG88L3RkPjwvdHI+DQogIDx0cj48dGQ+55Ge5YW46K+tPC90ZD48dGQ+c3dlPC90ZD48dGQ+5YyI54mZ5Yip6K+tPC90ZD48dGQ+aHU8L3RkPjx0ZD7nuYHkvZPkuK3mloc8L3RkPjx0ZD5jaHQ8L3RkPjwvdHI+DQogIDx0cj48dGQ+6LaK5Y2X6K+tPC90ZD48dGQ+dmllPC90ZD48L3RyPg0KICA8L3RhYmxlPg0KDQotIOatjOabsuebuOWFsw0KICANCiAgICAgLSDngrnmrYwr5q2M5puy5ZCNWyvlubPlj7Dor4bliKvnoIFdOuaZrumAmueCueatjA0KICAgICAgIA0KICAgICAgICAgIC0g5pSv5oyB572R5piT5LqRLOmFt+aIkemfs+S5kA0KICAgICAgICAgIC0gZS5nLueCueatjOaYjuWkqeS9oOWlvTsNCiAgDQogICAgIC0g56C06KejK+atjOabsuWQjVsr5bmz5Y+w6K+G5Yir56CBXTrnoLTop6PmrYzmm7LkuIvovb3lnLDlnYANCiAgICAgICANCiAgICAgICAgICAtIGUuZy7noLTop6PmmI7lpKnkvaDlpb0kDQogICAgICAgICAgLSBlLmcu56C06Kej5piO5aSp5L2g5aW9DQogIA0KICAgICAtIOatjOabsivmrYzmm7LlkI1bK+WPguaVsF1bK+W5s+WPsOivhuWIq+eggV3vvJrmrYzmm7Lpq5jnuqfmkJzntKINCiAgICAgICANCiAgICAgICAgICAtIGUuZy7mrYzmm7LmmI7lpKnkvaDlpb0NCiAgICAgICAgICAtIGUuZy7mrYzmm7LmmI7lpKnkvaDlpb0kDQogIA0KICAgICAtIOW5s+WPsOivhuWIq+eggQ0KICAgICAgIA0KICAgICAgICAgIC0g5LiN5YqgOum7mOiupCjnoLTop6Ppu5jorqRRUemfs+S5kCzlhbbku5bpu5jorqTnvZHmmJPkupEpDQogICAgICAgICAgLSDliIblj7c6UVHpn7PkuZANCiAgICAgICAgICAtICTlj7c66YW35oiR6Z+z5LmQDQoNCi0g5pep5LiK5aW9L+aXqeWVijrml6nlronpl67lgJkNCg0KLSDmirHmirE65p2l6Ieq5a695a6955qE5oqx5oqxDQoNCi0g5L2g5aW9OuS/oeaBr+mdouadvw0KDQotIOWKn+iDvTrmnKzlip/og73pnaLmnb8NCg0KLSDotZ7liqk66LWe5Yqp5L2c6ICFDQoNCi0g576k5LqL5Lu2Og0KICANCiAgICAgLSBcI+aOpem+mQ0KICAgICAtIFwj5oqV56WoDQogICAgIC0gXCPmir3lpZYNCg0KLSDmtYvor5XkuK06DQoNCi0g576k6IGK566h55CG5ZGYOg0KICANCiAgICAgLSDpu5HlkI3ljZUo5Y2V54us6K+t5rOVKee+pOm7keWQjeWNlQ0KICAgICAtIOasoui/jijljZXni6zor63ms5Up6K6+572u5qyi6L+O6K+tDQoNCi0g5bey5YGc55SoOg0KICANCiAgICAgLSDnlqvmg4Vb5Z+O5biCXTrnlqvmg4Xmn6Xor6INCg0KLSDmhI/op4Hlj43ppog6DQogIA0KICAgICAtIOWPjemmiFvlhoXlrrldDQoNCi0g5LqM57u056CBW+WGheWuuV065Yi25L2c5LqM57u056CBDQoNCiMjIOekuuS+iw0KDQorIEDmmbrpmpzlrr3lrr0g54K55q2M5piO5aSp5Lya5pu05aW9DQorIEDmmbrpmpzlrr3lrr0g5Zyw5Zu+6YeN5bqGDQorIEVUQy4NCg0KIyMg5L2/55So5pa55rOVDQoNCisg5YqgUVHlpb3lj4syNDM5OTczNDcyDQorIOWPr+S7peaLieWFpee+pOiBig0KKyDpnIDopoHnrqHnkIblkZjlkIzmhI/vvIzmiYDku6XnlLPor7flkI7lj6/og73pnIDopoHogJDlv4PnrYnlvoXkuIDkvJoNCg0KIyMg5rOo5oSP5LqL6aG5DQoNCjEuIOWvueS6jlFR5p2l6K+0LEDmmK/kuIDkuKrnibnmrormoLzlvI8qKuS4jeiDveWkjeWItioqDQoyLiDljZXkuKrnlKjmiLcxMDBz6ZmQ5Yi2MjDmrKHvvIznvqTogYoxMDBz6ZmQ5Yi2NTDmrKENCg0KIyMg5YWz5LqO5L2c6ICFDQoNCuS9nOiAheS4u+mhtVvlrr3lrr0yMDA3XShodHRwczovL2t1YW5rdWFuMjAwNy5naXRlZS5pbyAi5L2c6ICF5Li76aG1IikNCg==","../../../src/data/docs/self-made-pvz.md":"data:text/markdown;base64,IyDoh6rliLZwdnoNCg0KIyMg5LuL57uNDQoNCueejum8k+aNo+eahO+8jOW6lOivpeayoeS6uueciyAgDQrlm77niYfmnaXoh6rnvZHnu5wNCg0KIyMg6L2v5Lu25p625p6EDQoNCisgYXVkaW866Z+z6aKR5paH5Lu2DQoNCisgaW1hZ2VzOuWbvueJh+aWh+S7tg0KDQorIGxpYjrovoXliqnnqIvluo8NCg0KIyMg5L2/55So6K+05piODQoNCisg56e75YqoOuS4iuS4i+W3puWPs+aMiemUrg0KDQorIOWPkeWwhDrnqbrmoLzplK4NCg0KKyDkuLvplK7nm5jmlbDlrZfplK465YiH5o2i5a2Q5by5Og0KICANCiAgICAgKyAxOuaZrumAmuWtkOW8uQ0KICANCiAgICAgKyAyOnNpbuWtkOW8uQ0KICANCiAgICAgKyAzOueIhueCuOWtkOW8uSjmtYvor5XkuK0pfn7kuI3nqLPlrprmib5AeGktZ3Vhbmcx5Yir5om+5a695a69fn4NCg0KIyMg6IOc6LSf5Yik5patDQoNCisg5YO15bC45Yiw6L6+5bqV57q/5Li66L6TDQoNCisgMTUwc+ayoeacieWksei0peS4uuiDnOWIqQ0KDQojIyDlj4LkuI7otKHnjK4NCg0KMS4gRm9yayDmnKzku5PlupMNCjIuIOaWsOW7uiBGZWF0X3h4eCDliIbmlK8NCjMuIOaPkOS6pOS7o+eggQ0KNC4g5paw5bu6IFB1bGwgUmVxdWVzdA0KDQojIyDlhbPkuo7kvZzogIUNCg0K5pys6aG555uu55SxW+WuveWuvTIwMDddKGh0dHBzOi8va3Vhbmt1YW4yMDA3LmdpdGVlLmlvKeWSjFvmsZDlhYldKGh0dHBzOi8vZ2l0ZWUuY29tL3hpLWd1YW5nMSnlkIjkvZzlrozmiJANCg0K5aaC5pyJ6Zu35ZCM57qv5bGe5ben5ZCIDQo=","../../../src/data/docs/simple-chat-software.md":"data:text/markdown;base64,IyDmtojmga/mlLblj5HnroDmmJMNCg0K6Ieq5Yi255qE77yM5YCf5Yqp5pyN5Yqh5Zmo5LqS55u45Y+R6YCB5raI5oGv55qE56iL5bqPDQoNCiMjIOS9v+eUqOivtOaYjg0KDQojIyMg5pyN5Yqh56uvDQoNCmNvbmZpZy5qc29u5Lit6YWN572u55uR5ZCs56uv5Y+j44CB55uR5ZCs5Zyw5Z2ADQoNCueEtuWQjuebtOaOpei/kOihjOWNs+WPrw0KDQojIyMg5a6i5oi356uvDQoNCuWcqGNvbmZpZy5qc29u5Lit6K6+572u5pyN5Yqh5Zmo55qE5Zyw5Z2A44CB56uv5Y+jDQoNCuaJk+W8gOWQjui+k+WFpeeUqOaIt+WQje+8iOWGheWuuemaj+aEj++8jOS4jeS9juS6jjLlrZfnrKbvvIkNCg0K54S25ZCO5bCx5Y+v5Lul5aSa56uv5Y+R6YCB5raI5oGv5ZWmDQoNCiMjIyDms6jmhI8NCg0K5a6i5oi356uvNjBz5rKh5pyJ5raI5oGv6KeG5Li65LiL57q/77yM5Yig6Zmk55So5oi377yI5Y2z5YW25LuW5Lq65Y+v5Lul5L2/55So6K+l55So5oi35ZCN77yJDQoNCuS8oOi+k+S9v+eUqGFlc+WKoOWvhu+8jOenmOmSpeS4uueZu+W9leaXtuacjeWKoeerr+WQkeWuouaIt+err+WIhuWPke+8jOacn+mXtOS4jeWPr+S/ruaUuQ0KDQojIyDlhbPkuo7kvZzogIUNCg0K5L2c6ICFW+WuveWuvTIwMDddKGt1YW5rdWFuMjAwNy5naXRlZS5pbyAi5L2c6ICF5Li76aG1IikNCg0K5pys6aG555uu5ZyoW+eugOaYk+iBiuWkqei9r+S7tjog5L2/55So6ZW/6L2u6K+i55qE77yM5Lit5b+D5YyW5raI5oGv6L2v5Lu2IChnaXRlZS5jb20pXShodHRwczovL2dpdGVlLmNvbS9rdWFua3VhbjIwMDcvc2ltcGxlLWNoYXQtc29mdHdhcmUvKeS4iuW8gOa6kA0K","../../../src/data/docs/smart-reply.md":"data:text/markdown;base64,IyDmmbrog73lm57lpI0NCg0Kfn7mmbrpmpzlm57lpI1+fg0KDQojIyDoh7TosKINCg0K6L+Z5Liq5Lq65bel5pm66IO957O757uf5Z+65LqO5YW25LuW5aSn5L2s55qE5Lul5LiL5LiJ5pa55bqT5byA5Y+RDQoNCisgc2tsZWFybjror63kuYnor4bliKsm5Yaz562W5qCRDQoNCisgamllYmE65Lit5paH55qE6K+N6K+t5YiH5YmyDQoNCuWcqOa1heaYvueahOS6huino+S6huWfuuacrOWOn+eQhuS5i+WQjuacrOS6uuWvueS7peS4iuS4pOS4quS4ieaWueW6k+eahOS9nOiAheS7rOa3seaEn+aVrOS9qX5+KOWPjeato+aIkeaYr+S4jeWPr+iDveaciei/meS5iOW8uueahOaAnee7tOeahCl+fu+8jOaEn+iwouS9oOS7rOi+m+WLpOeahOWKs+S9nOS7peWPiuWkp+aWueWcsOWwhuiHquW3seeahOaIkOaenOe7meWkp+WutuS9v+eUqA0KDQojIyDln7rmnKzljp/nkIYNCg0K6L6T5YWlDQoNCmppZWJh5YiS5YiG6K+N6K+tDQoNCnNrbGVhcm4uZmVhdHVyZV9leHRyYWN0aW9uLnRleHQuQ291bnRWZWN0b3JpemVy5oqT5Y+W54m55b6B6K+NDQoNCnNrbGVhcm4udHJlZS5EZWNpc2lvblRyZWVDbGFzc2lmaWVy5Yaz562WDQoNCui+k+WHuue7k+aenA0KDQojIyDkvb/nlKjmlrnlvI8NCg0KYGBgcHkNCndpdGggb3BlbigibW9kZWwucGtsIiwicmIiKSBhcyBtOg0KICAgIG1vZGFsPXBpY2tsZS5sb2FkKG0pDQp3aXRoIG9wZW4oImFpLnBrbCIsInJiIikgYXMgbToNCiAgICBhaT1waWNrbGUubG9hZChtKQ0KdGV4dD1pbnB1dCgpDQp0ZXh0PSJ8Ii5qb2luKGppZWJhLmN1dCh0ZXh0KSkNCnRleHQ9bW9kYWwudHJhbnNmb3JtKFt0ZXh0XSkNCnJlc3VsdD1haS5wcmVkaWN0KGFpVmFyZSlbMF0NCnByaW50KHJlc3VsdCkNCmBgYA0KDQojIyDorq3nu4PmlrnlvI8NCg0KMS4g5bCGcGQuRGF0YUZyYW1lKHBkLnJlYWRfZXhjZWwoJ2V4YW1wbGUueGxzeCcpKeS/ruaUueaIkOi+k+WFpeeahOaVsOaNruihqOWQjeensA0KDQoyLiDovpPlhaXooajmoLzljIXmi6zkuKTliJc6DQogICANCiAgICAgIDEuIOesrOS4gOihjOS4uiJpbnB1dCIs5Lul5LiL5YaF5a655Li66L6T5YWlDQogICANCiAgICAgIDIuIOesrOS4gOihjOS4uiJvdXRwdXQiLOS7peS4i+WGheWuueS4uui+k+WFpeWvueW6lOeahOi+k+WHug0KDQojIyDlo7DmmI4NCg0K6K6t57uD5pWw5o2u5p2l5rqQ5LqO572R5Y+L5pel5bi46IGK5aSp77yM5LiO5pys5Lq65peg5YWzDQoNCiMjIOWFs+S6juS9nOiAhQ0KDQrkvZzogIXkuLvpobVb5a695a69MjAwN10oa3Vhbmt1YW4yMDA3LmdpdGVlLmlvICLkvZzogIXkuLvpobUiKQ0KDQrmnKzpobnnm67lnKhb6Iuf5rWp6ZOtL+aZuuiDveWbnuWkjSAoZ2l0ZWUuY29tKV0oaHR0cHM6Ly9naXRlZS5jb20va3Vhbmt1YW4yMDA3L3NtYXJ0LXJlcGx5KeS4iuW8gOa6kA0K"})[`../../../src/data/docs/${O}.md`],self.location))).then((I=>{I.text().then((I=>{G.value=I,L.value=!0}),(I=>{o("获取数据失败",(()=>{location.href="/docs/"}))}))}),(I=>{o("获取数据失败",(()=>{location.href="/docs/"}))})),(I,g)=>(C(),a(e,null,[l(A,{title:m(b)?m(b).title:"文档不存在"},null,8,["title"]),m(b)?(C(),a("div",D,[i("div",k,[i("div",Z,[i("button",{onClick:g[0]||(g[0]=I=>m(r)(m(G),`${m(b).name}.md`))},Q)]),m(L)?(C(),W(v,{key:0,content:m(G),"header-level-start":2},null,8,["content"])):K("",!0)])])):K("",!0)],64))}},[["__scopeId","data-v-33fb3e26"]])).mount("#app");
