// auto-write by dsl-crystal

#ifndef __{{projname_up}}_CRYSTAL_CSVLOADER_H__
#define __{{projname_up}}_CRYSTAL_CSVLOADER_H__

#include <map>

class CSVLoader{
    typedef std::pair<std::string, int>	_PairHead;
    typedef std::map<std::string, int>	_MapHead;
public:
    CSVLoader();
    virtual ~CSVLoader();
public:
    void load(const char* filename);
    
    void release();
    
    void reloadFromMem(const char* date, unsigned long size);
public:
    const char* get(int x, int y) const;
    
    const char* get(const char* headname, int y) const;
    int get_int(const char* headname, int y) const;
    
    int getWidth() const { return m_iWidth; }
    
    int getHeight() const { return m_iHeight; }
public:
    char*			m_pBuff;
    char***			m_pArray;
    int				m_iWidth, m_iHeight;
    
    _MapHead		m_mapHead;

};

#endif // __{{projname_up}}_CRYSTAL_CSVLOADER_H__
