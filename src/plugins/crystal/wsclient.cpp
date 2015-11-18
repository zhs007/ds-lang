// auto-write by dsl-crystal

#include "wsclient.h"
#include "logicdata.h"

WSClient::WSClient()
{
    m_sendKeyHeader = 0;
    m_pHeader = new char[4];
    m_pBuff = NULL;
    m_lastHeader = 4;
    m_lastBuff = 0;

    m_state = WSCLIENTSTATE_NORMAL;
    m_pWebSocket = NULL;

    m_iConnTimes = 0;

    m_forceClose = false;
}

WSClient::~WSClient()
{
}

WSClient& WSClient::getSingleton()
{
    static WSClient s_mgr;
    return s_mgr;
}

void WSClient::release()
{
    if (m_pWebSocket != NULL)
    {
        m_pWebSocket->close();
    }

    m_state = WSCLIENTSTATE_NORMAL;
}

void WSClient::forceClose()
{
    m_forceClose = true;
    release();
}

void WSClient::connect(const char* addr)
{
    if (m_pWebSocket != NULL)
    {
        release();
    }

    m_pWebSocket =  new cocos2d::network::WebSocket();

    log("m_pWebSocket : %s", addr);
    m_pWebSocket->init(*this, addr);

    m_addr = addr;

    m_state = WSCLIENTSTATE_CONNECTING;
}

void WSClient::onOpen(network::WebSocket* ws)
{
    if (ws == m_pWebSocket)
    {
        log("Send Text WS was opened.");

        m_state = WSCLIENTSTATE_CONNECTED;

        m_iConnTimes = 0;

//        if(!m_bLogined)
//        {
//            login();
//        }
    }
}

void WSClient::onProcServiceMsg(slots3::ServiceMsg& msg)
{
    log("==============onProcServiceMsg");

    for(int i = 0; i < msg.msg_size(); ++i)
    {
        {{projname}}::BaseMsg& basemsg =  msg.msg(i);
        onProcBaseMsg(basemsg);
    }
}

void WSClient::onProcBaseMsg(slots3::BaseMsg& msg)
{
    switch(msg.msgid())
    {
{{#each block_onmsg}}
    case {{../projname}}::{{msgid}}:
        {
            {{../projname}}::{{msgname}} cmsg;
            cmsg.ParseFromString(msg.buff());
            onMsg_{{rname}}(cmsg);
        }
        break;
{{/each}}
    }
}

void WSClient::onRecvMsgHeader()
{
    m_lastHeader = 0;

    unsigned short length = ntohs(*(unsigned short*)m_pHeader);
    unsigned short key = ntohs(*(unsigned short*)(m_pHeader + 2));

    m_pBuff = new char[length];
    m_lastBuff = length;
    m_msgLength = length;
}

void WSClient::onRecvMsgBuff()
{
    slots3::ServiceMsg msg;
    msg.ParseFromArray(m_pBuff, m_msgLength);
    onProcServiceMsg(msg);

    delete[] m_pBuff;

    m_lastHeader = 4;
    m_lastBuff = 0;
}

void WSClient::procRecvMessage(network::WebSocket* ws, const network::WebSocket::Data& data, int begin)
{
    if (m_lastHeader > 0) {
        if (data.len - begin >= m_lastHeader) {
            memcpy(m_pHeader + 4 - m_lastHeader, data.bytes + begin, m_lastHeader);

            begin += m_lastHeader;

            onRecvMsgHeader();
        }
        else {
            memcpy(m_pHeader + 4 - m_lastHeader, data.bytes + begin, (data.len - begin));

            m_lastHeader -= data.len - begin;
            begin += data.len - begin;

            return ;
        }
    }

    if (begin >= data.len) {
        return ;
    }

    if (m_lastBuff > 0) {
        if (data.len - begin >= m_lastBuff) {
            memcpy(m_pBuff + m_msgLength - m_lastBuff, data.bytes + begin, m_lastBuff);

            begin += m_lastBuff;
            m_lastBuff = 0;

            onRecvMsgBuff();
        }
        else {
            memcpy(m_pBuff + m_msgLength - m_lastBuff, data.bytes + begin, (data.len - begin));

            m_lastBuff -= data.len - begin;
            begin += data.len - begin;

            return ;
        }
    }

    if (begin >= data.len) {
        return ;
    }

    procRecvMessage(ws, data, begin);
}

void WSClient::onMessage(network::WebSocket* ws, const network::WebSocket::Data& data)
{
    procRecvMessage(ws, data, 0);
}

void WSClient::onClose(network::WebSocket* ws)
{
    log("WebSocket is Closing!!!");
    log("WebSocket is Closing!!!");
    log("WebSocket is Closing!!!");

    bool isclose = false;

    if (ws == m_pWebSocket)
    {
        m_pWebSocket = NULL;

        isclose = true;
    }

    CC_SAFE_DELETE(ws);

    if (isclose)
    {
        if (m_forceClose)
        {
            return ;
        }

        if(GameMgr::getSingleton().m_pConnectNetUI == NULL)
        {
            //        MessageBox("连接中断，点击确定重新连接。", "提示");
            GameMgr::getSingleton().showConnectNetUI();
        }

        reconnect();
    }
}

void WSClient::onError(network::WebSocket* ws, const network::WebSocket::ErrorCode& error)
{
    log("Error was fired, error code: %d", error);
    if (ws == m_pWebSocket)
    {
        char buf[100] = {0};
        sprintf(buf, "an error was fired, code: %d", error);
        //        log(buf);
        //        _sendTextStatus->setString(buf);
    }

//!发消息
void WSClient::send(int len, unsigned char* buff)
{
    if (m_pWebSocket == NULL)
    {
        return;
    }

    AutoLock<LockImp> lock(m_lockSend);

    unsigned short size = htons(len);
    unsigned short key = htons(m_sendKeyHeader);
    m_pWebSocket->send((unsigned char*)&size, sizeof(size));
    m_pWebSocket->send((unsigned char*)&key, sizeof(m_sendKeyHeader));

    m_sendKeyHeader++;

    m_pWebSocket->send(buff, len);
}

//!发消息
void WSClient::sendMsg(slots3::MSGID msgid, int len, unsigned char* buff)
{
    if (m_pWebSocket == NULL)
    {
        return;
    }

    slots3::BaseMsg msg;
    msg.set_msgid(msgid);
    msg.set_buff(buf, len);

    slots3::ClientMsg cmsg;
    cmsg.set_allocated_msg(&msg);

    int clen = cmsg.ByteSize();
    unsigned char* cbuf = new unsigned char[clen];
    cmsg.SerializeToArray(cbuf, clen);

    send(clen, cbuf);

    delete cbuf;
}

void WSClient::reconnect()
{
    ++m_iConnTimes;

    if (m_iConnTimes > 10)
    {
        connect(m_addr.c_str());
    }
}

{{#each block_sendmsg}}
// {{comment}}
void WSClient::sendMsg_{{rname}}({{funcparam}})
{
    {{../projname}}::Res_{{rname}} __msg;
    {{#each member}}
    __msg.set_{{name}}({{name}});
    {{/each}}

    int __msglen = __msg.ByteSize();
    unsigned char* __msgbuf = new unsigned char[__msglen];
    __msg.SerializeToArray(__msgbuf, __msglen);

    sendMsg({{../projname}}::MSGID::{{msgid}}, __msglen, __msgbuf);

    delete __msgbuf;
}

{{/each}}

{{#each block_onmsg}}
// {{comment}}
void WSClient::onMsg_{{rname}}({{../projname}}::{{msgname}}& msg)
{
    {{#each member}}
    {{../../mainobj.name}}::getSingleton().{{data}} = msg.{{name}}();
    {{/each}}
}

{{/each}}