// auto-write by dsl-crystal

#include "csvloader.h"
#include "cocos2d.h"

CSVLoader::CSVLoader()
    : m_pBuff(NULL)
    , m_pArray(NULL)
    , m_iWidth(0)
    , m_iHeight(0)
{
}

CSVLoader::~CSVLoader()
{
    release();
}

void CSVLoader::release()
{
    if(m_pBuff != NULL)
    {
        free(m_pBuff);
        
        m_pBuff = NULL;
    }
    
    if(m_pArray != NULL)
    {
        free(m_pArray);
        
        m_pArray = NULL;
    }
    
    m_mapHead.clear();
}

const char* CSVLoader::get(int x, int y) const
{
    if(x >= 0 && x < m_iWidth && y >= 0 && y < m_iHeight)
    {
        if(m_pArray != NULL)
            return m_pArray[y][x];
    }
    
    return "";
}

const char* CSVLoader::get(const char* headname, int y) const
{
    _MapHead::const_iterator it = m_mapHead.find(headname);
    if(it != m_mapHead.end())
        return get(it->second, y);
    
    return "";
}

int CSVLoader::get_int(const char* headname, int y) const
{
    _MapHead::const_iterator it = m_mapHead.find(headname);
    if(it != m_mapHead.end())
        return atoi(get(it->second, y));
    
    return 0;
}

void CSVLoader::reloadFromMem(const char* pBuff, unsigned long size)
{
    release();
    
    {
        m_pBuff = (char*)malloc(size + 1);
        
        memcpy(m_pBuff, pBuff, size);
        
        m_pBuff[size] = '\0';
        
        m_iWidth = 0;
        m_iHeight = 0;
        
        for(unsigned long i = 0; i < size; ++i)
        {
            if(m_iHeight == 0 && m_pBuff[i] == ',')
                ++m_iWidth;
            else if(m_pBuff[i] == '\r' && m_pBuff[i + 1] == '\n')
            {
                ++i;
                ++m_iHeight;
            }
            else if(m_pBuff[i] == '\n')
                ++m_iHeight;
            
        }
        
        ++m_iWidth;
        
        m_pArray = (char***)malloc(sizeof(char*) * m_iWidth * m_iHeight + sizeof(char**) * m_iHeight);
        
        for(int i = 0; i < m_iHeight; ++i)
        {
            m_pArray[i] = (char**)((char*)m_pArray + m_iHeight * sizeof(char**) + m_iWidth * i * sizeof(char*));
        }
        
        int x = 0;
        int y = 0;
        char* last = m_pBuff;
        
        for(unsigned long i = 0; i < size; ++i)
        {
            if(m_pBuff[i] == ',')
            {
                m_pBuff[i] = '\0';
                
                CC_ASSERT(y < m_iHeight);
                CC_ASSERT(x < m_iWidth);
                m_pArray[y][x] = last;
                
                ++x;
                last = m_pBuff + i + 1;
            }	
            else if(m_pBuff[i] == '\r' && m_pBuff[i + 1] == '\n')
            {
                m_pBuff[i] = '\0';
                m_pBuff[i + 1] = '\0';
                
                CC_ASSERT(y < m_iHeight);
                CC_ASSERT(x < m_iWidth);
                m_pArray[y][x] = last;
                
                ++i;
                ++y;
                x = 0;
                
                last = m_pBuff + i + 1;
            }
            else if(m_pBuff[i] == '\n')
            {
                m_pBuff[i] = '\0';
                
                CC_ASSERT(y < m_iHeight);
                CC_ASSERT(x < m_iWidth);
                m_pArray[y][x] = last;
                
                ++y;
                x = 0;
                
                last = m_pBuff + i + 1;
            }
        }
        
        for(int i = 0; i < m_iWidth; ++i)
        {
            _PairHead p(m_pArray[0][i], i);
            
            m_mapHead.insert(p);
        }
    }
}

void CSVLoader::load(const char* name)
{
    std::string fullPath = name;//CCFileUtils::sharedFileUtils()->fullPathFromRelativeFile(name);
    ssize_t size;
    char* pBuff = (char*)cocos2d::FileUtils::getInstance()->getFileData(fullPath.c_str(), "r", &size);
    if(pBuff != NULL)
    {
        reloadFromMem(pBuff, size);
        
        delete pBuff;
    }
}
