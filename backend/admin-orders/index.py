import json
import os
import psycopg2
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Get all orders for admin panel
    Args: event with httpMethod GET
    Returns: List of all orders with details
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method == 'GET':
        dsn = os.environ.get('DATABASE_URL')
        conn = psycopg2.connect(dsn)
        cur = conn.cursor()
        
        cur.execute("""
            SELECT 
                id,
                event_date,
                event_location,
                event_time,
                contact_type,
                contact,
                promo_code,
                total_price,
                items,
                created_at
            FROM t_p95264310_krym_creative_union.orders
            ORDER BY created_at DESC
        """)
        
        orders = []
        for row in cur.fetchall():
            orders.append({
                'orderId': row[0],
                'eventDate': row[1].isoformat() if row[1] else None,
                'eventLocation': row[2],
                'eventTime': str(row[3]) if row[3] else None,
                'contactType': row[4],
                'contactInfo': row[5],
                'promoCode': row[6],
                'totalAmount': row[7],
                'items': row[8],
                'createdAt': row[9].isoformat() if row[9] else None
            })
        
        cur.close()
        conn.close()
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'orders': orders})
        }
    
    return {
        'statusCode': 405,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({'error': 'Method not allowed'})
    }