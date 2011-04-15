using System.Collections.Generic;
using System.IO;
using FubuCore;
using FubuCore.Reflection;

namespace Bottles.Deployment.Writing
{
    public class RecipeWriter
    {
        
        private readonly ITypeDescriptorCache _types;
        private readonly TextWriter _writer = new StringWriter();

        public RecipeWriter(ITypeDescriptorCache types)
        {
            _types = types;
        }

        public void WriteReference(BottleReference reference)
        {
            var text = ProfileFiles.BottlePrefix + reference.Name;
            if (reference.Relationship.IsNotEmpty())
            {
                text += " " + reference.Relationship;
            }

            _writer.WriteLine(text);
        }

        public void WriteDirective(IDirective directive)
        {
            var directiveWriter = new DirectiveWriter(_writer, _types);
            directiveWriter.Write(directive);
        }

        public string ToText()
        {
            return _writer.ToString();
        }

        public IEnumerable<string> AllLines()
        {
            var lines = new List<string>();

            using (var reader = new StringReader(ToText()))
            {
                string line;
                while ((line = reader.ReadLine()) != null)
                {
                    lines.Add(line);
                }
            }

            return lines;
        }

        public void WritePropertyValue(PropertyValue value)
        {
            _writer.WriteLine("{0}.{1}={2}"
                              , value.Accessor.DeclaringType.Name
                              , value.Accessor.PropertyNames.Join(".")
                              , value.Value == null ? string.Empty : value.Value.ToString());
        }
    }
}