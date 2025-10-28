import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Manage sections and services content
    Args: event with httpMethod GET (get all), POST (create), PUT (update)
    Returns: Sections and services data
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    dsn = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(dsn)
    cur = conn.cursor()
    
    if method == 'GET':
        cur.execute("""
            SELECT id, slug, title, description 
            FROM t_p95264310_krym_creative_union.sections
            ORDER BY id
        """)
        
        sections = []
        for row in cur.fetchall():
            section_id = row[0]
            
            cur.execute("""
                SELECT id, name, description, price, image_url, video_url, is_extra, extra_label, sort_order
                FROM t_p95264310_krym_creative_union.services
                WHERE section_id = %s
                ORDER BY sort_order, id
            """, (section_id,))
            
            services = []
            for svc_row in cur.fetchall():
                services.append({
                    'id': svc_row[0],
                    'name': svc_row[1],
                    'description': svc_row[2],
                    'price': svc_row[3],
                    'imageUrl': svc_row[4],
                    'videoUrl': svc_row[5],
                    'isExtra': svc_row[6],
                    'extraLabel': svc_row[7],
                    'sortOrder': svc_row[8]
                })
            
            sections.append({
                'id': row[0],
                'slug': row[1],
                'title': row[2],
                'description': row[3],
                'services': services
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'sections': sections})
        }
    
    if method == 'POST':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'create_section':
            slug = body_data.get('slug')
            title = body_data.get('title')
            description = body_data.get('description', '')
            
            cur.execute("""
                INSERT INTO t_p95264310_krym_creative_union.sections (slug, title, description)
                VALUES (%s, %s, %s)
                RETURNING id
            """, (slug, title, description))
            new_id = cur.fetchone()[0]
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id, 'slug': slug, 'title': title})
            }
        
        if action == 'create_service':
            section_id = body_data.get('sectionId')
            name = body_data.get('name')
            description = body_data.get('description', '')
            price = body_data.get('price')
            image_url = body_data.get('imageUrl', '')
            video_url = body_data.get('videoUrl', '')
            is_extra = body_data.get('isExtra', False)
            extra_label = body_data.get('extraLabel', '')
            
            cur.execute("""
                INSERT INTO t_p95264310_krym_creative_union.services 
                (section_id, name, description, price, image_url, video_url, is_extra, extra_label)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
                RETURNING id
            """, (section_id, name, description, price, image_url, video_url, is_extra, extra_label))
            new_id = cur.fetchone()[0]
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 201,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'id': new_id})
            }
    
    if method == 'PUT':
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action')
        
        if action == 'update_section':
            section_id = body_data.get('id')
            title = body_data.get('title')
            description = body_data.get('description')
            
            cur.execute("""
                UPDATE t_p95264310_krym_creative_union.sections
                SET title = %s, description = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (title, description, section_id))
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True})
            }
        
        if action == 'update_service':
            service_id = body_data.get('id')
            name = body_data.get('name')
            description = body_data.get('description')
            price = body_data.get('price')
            image_url = body_data.get('imageUrl')
            video_url = body_data.get('videoUrl')
            
            cur.execute("""
                UPDATE t_p95264310_krym_creative_union.services
                SET name = %s, description = %s, price = %s, 
                    image_url = %s, video_url = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
            """, (name, description, price, image_url, video_url, service_id))
            conn.commit()
            
            cur.close()
            conn.close()
            
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'success': True})
            }
    
    cur.close()
    conn.close()
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }
