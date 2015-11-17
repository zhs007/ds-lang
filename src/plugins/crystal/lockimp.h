// auto-write by dsl-crystal

#ifndef __{{projname_up}}_CRYSTAL_LOCKIMP_H__
#define __{{projname_up}}_CRYSTAL_LOCKIMP_H__

#include <mutex>

class LockImp{
public:
    LockImp() {
    }
    virtual ~LockImp() {
    }
public:
    void Lock() {
        m_mutex.lock();
    }
    
    void Unlock() {
        m_mutex.unlock();
    }
protected:
    std::recursive_mutex		m_mutex;
};

template<class T>
class AutoLock{
public:
public:
    // 构造函数自动锁定
    AutoLock(T& lock) : m_lock(lock) {
        m_lock.Lock();
    }
    
    // 析构函数自动解锁
    ~AutoLock() {
        m_lock.Unlock();
    }
private:
    //! 赋值操作符，不做任何处理
    void operator = (const AutoLock<T>& ) {}
private:
    T&		m_lock;
};
#endif // __{{projname_up}}_CRYSTAL_LOCKIMP_H__
