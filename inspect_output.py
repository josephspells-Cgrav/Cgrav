import json

OUT = r"C:\Users\josep\AppData\Local\Temp\claude\C--Users-josep-Claude-Gravity\3d62ab1d-db03-4b66-bd97-dc285fe0e860\tasks\wkkxfcte7.output"
raw = open(OUT, encoding="utf-8", errors="replace").read()
print("FILE LEN:", len(raw))
print("FIRST 300 chars:\n", raw[:300])
print("\nLAST 300 chars:\n", raw[-300:])

def walk(obj, depth=0, path="root"):
    pad = "  " * depth
    if isinstance(obj, dict):
        print(pad + path + " {dict} keys=" + str(list(obj.keys()))[:200])
        if depth < 2:
            for k, v in obj.items():
                walk(v, depth + 1, k)
    elif isinstance(obj, list):
        print(pad + path + " [list len=" + str(len(obj)) + "]")
        if obj and depth < 2:
            walk(obj[0], depth + 1, path + "[0]")
    else:
        s = str(obj)
        print(pad + path + " <" + type(obj).__name__ + "> " + s[:80])

try:
    data = json.loads(raw)
    print("\nTOP-LEVEL PARSE OK. Structure:")
    walk(data)
except Exception as ex:
    print("\ndirect parse failed:", ex)
    s = raw.find("{")
    e = raw.rfind("}")
    data = json.loads(raw[s:e + 1])
    print("substring parse OK. Structure:")
    walk(data)
