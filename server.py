import http.server
import socketserver
import os

PORT = 8080  # The port your web server will listen on

# Change the current working directory to the directory where your static files are
# If your index.html is in the root, you can remove this line or set it to '.'
# If your files are in a subdirectory (e.g., 'public'), change '.' to 'public'
web_dir = '.' # Assuming your index.html and other files are in the root
os.chdir(web_dir)

Handler = http.server.SimpleHTTPRequestHandler

with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving static files from '{web_dir}' at http://0.0.0.0:{PORT}")
    # This print statement is important! Wasmer will see this as a log.
    httpd.serve_forever()
