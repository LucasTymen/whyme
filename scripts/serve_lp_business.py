#!/usr/bin/env python3
"""Serveur proxy pour LP Business sur le port 7450"""
import http.server
import socketserver
import urllib.request
import urllib.parse

PORT = 7450
TARGET_URL = "http://localhost:8010/why-me/"

class ProxyHandler(http.server.BaseHTTPRequestHandler):
    protocol_version = "HTTP/1.1"
    
    def do_GET(self):
        try:
            # Construire l'URL cible avec persona=business
            params = urllib.parse.parse_qs(urllib.parse.urlparse(self.path).query)
            params['persona'] = ['business']
            
            # Conserver firstname et company si fournis
            if 'firstname' not in params:
                params['firstname'] = ['Test']
            if 'company' not in params:
                params['company'] = ['TestCorp']
            
            query_string = urllib.parse.urlencode(params, doseq=True)
            url = f"{TARGET_URL}?{query_string}"
            
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                # Copier le statut
                self.send_response(response.status)
                
                # Copier les headers
                for header, value in response.getheaders():
                    if header.lower() not in ('connection', 'keep-alive', 'transfer-encoding'):
                        self.send_header(header, value)
                
                self.send_header('Connection', 'close')
                self.end_headers()
                
                # Copier le body
                self.wfile.write(response.read())
        except Exception as e:
            self.send_error(500, f"Proxy error: {e}")

Handler = ProxyHandler

with socketserver.TCPServer(("0.0.0.0", PORT), Handler) as httpd:
    print(f"Serving LP Business on port {PORT}")
    print(f"Proxy to: {TARGET_URL}")
    print(f"Open: http://localhost:{PORT}/?firstname=X&company=Y")
    httpd.serve_forever()
