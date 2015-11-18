// auto-write by dsl-crystal

#ifndef __{{projname_up}}_CRYSTAL_WSCLIENT_H__
#define __{{projname_up}}_CRYSTAL_WSCLIENT_H__

#include "cocos2d.h"
#include "network/WebSocket.h"
#include "{{projname}}.pb.h"
#include "lockimp.h"

// WSClient状态
enum WSCLIENTSTATE{
    WSCLIENTSTATE_NORMAL        = 0,   // 默认状态，没有初始化
    WSCLIENTSTATE_CONNECTING    = 1,   // 连接
    WSCLIENTSTATE_CONNECTED     = 2,   // 连接
    WSCLIENTSTATE_LOGIN         = 2,   // 登录
};

class WSClient : public cocos2d::network::WebSocket::Delegate{
public:
    static WSClient& getSingleton();
public:
    void connect(const char* addr);

    void forceClose();

    //!发消息
    void send(int len, unsigned char* buff);
    //!发消息
    void sendMsg(slots3::MSGID msgid, int len, unsigned char* buff);
public:
{{#each block_sendmsg}}
    // {{comment}}
    void sendMsg_{{rname}}({{funcparam}});
{{/each}}
protected:
{{#each block_onmsg}}
    // {{comment}}
    void onMsg_{{rname}}({{../projname}}::{{msgname}}& msg);
{{/each}}
protected:
    void release();

    void reconnect();

    void onProcServiceMsg(slots3::ServiceMsg& msg);

    void onProcBaseMsg(slots3::BaseMsg& msg);

    void procRecvMessage(network::WebSocket* ws, const network::WebSocket::Data& data, int begin);

    void onRecvMsgHeader();
    void onRecvMsgBuff();
protected:
    virtual void onOpen(cocos2d::network::WebSocket* ws);
    virtual void onMessage(cocos2d::network::WebSocket* ws, const cocos2d::network::WebSocket::Data& data);
    virtual void onClose(cocos2d::network::WebSocket* ws);
    virtual void onError(cocos2d::network::WebSocket* ws, const cocos2d::network::WebSocket::ErrorCode& error);
protected:
    WSClient();
    virtual ~WSClient();
protected:
    cocos2d::network::WebSocket*    m_pWebSocket;       // ws
    LockImp                         m_lockSend;         // 发送消息锁，不允许同时发2个消息
    std::string                     m_addr;             // 当前连接地址
    WSCLIENTSTATE                   m_state;            // 当前状态

    bool                            m_forceClose;       // 强制关闭

    int                             m_iConnTimes;       // 连接次数

    unsigned short m_sendKeyHeader;
    char* m_pHeader;
    char* m_pBuff;
    int m_lastHeader;
    int m_lastBuff;
    int m_msgLength;
};

#endif // __{{projname_up}}_CRYSTAL_WSCLIENT_H__
