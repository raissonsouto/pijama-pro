from jinja2 import Environment, FileSystemLoader
import os

# Set up Jinja2 environment
env = Environment(loader=FileSystemLoader('templates'))

# Compile all templates in the templates directory
for root, dirs, files in os.walk('templates'):
    for file in files:
        if file.endswith('.html'):
            template_path = os.path.join(root, file)
            template = env.get_template(template_path)
            output_html = template.render()
            output_file = os.path.join('output', os.path.relpath(template_path, 'templates'))
            os.makedirs(os.path.dirname(output_file), exist_ok=True)
            with open(output_file, 'w') as f:
                f.write(output_html)

print("Templates compiled successfully.")