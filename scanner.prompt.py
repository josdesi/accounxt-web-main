import os

root_dir = "src"
valid_extensions = {".js", ".jsx", ".css", ".json"}
output_file = "project.prompt"

def generate_ascii_tree(start_path):
    tree_lines = []
    for root, dirs, files in os.walk(start_path):
        if '__pycache__' in dirs:
            dirs.remove('__pycache__')
            
        level = root.replace(start_path, '').count(os.sep)
        indent = '    ' * level
        tree_lines.append(f"{indent}{os.path.basename(root)}/")
        sub_indent = '    ' * (level + 1)
        for f in files:
            if f != '__init__.py':
                tree_lines.append(f"{sub_indent}{f}")
    return "\n".join(tree_lines)

def write_project_files(output_file, root_dir, valid_extensions):
    with open(output_file, "w", encoding="utf-8") as outfile:
        tree = generate_ascii_tree(root_dir)
        outfile.write("Directory Structure:\n")
        outfile.write(tree)
        outfile.write("\n\n")
        for foldername, subfolders, filenames in os.walk(root_dir):
            for filename in filenames:
                file_path = os.path.join(foldername, filename)
                ext = os.path.splitext(filename)[1]
                if ext in valid_extensions:
                    outfile.write(f"// {file_path}\n")
                    try:
                        with open(file_path, "r", encoding="utf-8") as infile:
                            content = infile.read()
                            outfile.write(content)
                            outfile.write("\n\n")
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")

write_project_files(output_file, root_dir, valid_extensions)
print(f"\n✅ File '{output_file}' generated successfully.")
